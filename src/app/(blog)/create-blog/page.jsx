"use client";
import React, { useState } from "react";
import QuillEditor from "@/components/QuillEditor/index";
import axios from "axios";
import toast from "react-hot-toast";
import AdminAccess from "@/components/AdminAuth";

export default function Page() {
  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });

  const handleDescriptionChange = (content) => {
    setBlog((prevState) => ({ ...prevState, body: content }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/blogs`,
        blog
      );
      if (response.data.success) {
        toast.success("Blog posted successfully!");
        setBlog({ title: "", body: "" }); // Reset form after success
      }
    } catch (error) {
      toast.error("Failed to post blog.");
      console.error("Error posting blog:", error);
    }
  };

  return (
    <AdminAccess>
      <div className="max-w-[75rem] mx-auto mb-[2rem] px-[1rem]">
        <h1 className="text-4xl font-bold">Create Blog</h1>
        <input
          type="text"
          value={blog.title}
          onChange={(e) =>
            setBlog((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <QuillEditor value={blog.body} onChange={handleDescriptionChange} />
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>{" "}
    </AdminAccess>
  );
}
