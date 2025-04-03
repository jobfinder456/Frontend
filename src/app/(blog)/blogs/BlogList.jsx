"use client"; // Ensure this runs on the client side

import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/blogs`);
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <a
          href={`/blogs/${blog.id}`}
          key={blog.id}
          className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm p-4"
        >
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">
            {blog.description
              ? blog.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "..."
              : "No content available"}
          </p>
        </a>
      ))}
    </div>
  );
}
