"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import axios from "axios";
import React, { useState } from "react";

function BlogsPage() {
  const [details, setDetails] = useState({
    title: "",
    content: "",
  });
  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      content: newContent,
    }));
  };

  const onPost = async () => {
    try {
      setLoader(true)
      const response = await axios.post("", details);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className="relative max-w-[73.75rem] mx-auto min-h-screen overflow-hidden p-[1rem]">
      <Navbar />
      {loader && <Loader />}
      <div className="w-[100%] flex flex-col items-end justify-center gap-[1rem] relative">
        <div className="w-[100%] bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[0.5rem]">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-inp"
            value={details.title}
            onChange={handleChange}
          />
          <label className="form-label mt-[1rem]">Content</label>
          <Tiptap setDesc={handleContentChange} oldDesc={details.content} />
        </div>
        <button
          onClick={onPost}
          className="w-[20%] bg-accent-blue-1 p-[8px] md:p-[12px] text-[1.2rem] font-medium rounded-[8px] text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default BlogsPage;
