"use client"; // Ensure this is client-side

import { useState, useRef, useEffect } from "react";
import { Eye, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import blogs from "@/lib/blogs"; // Import blogs array
import Head from "next/head";

// Fetching blogs data directly in the client-side component
export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [blogList, setBlogList] = useState(blogs); // Use state to manage blogs data
  const dropdownRef = useRef(null);

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  const filteredBlogs =
    selectedTags.length > 0
      ? blogList.filter((blog) =>
          blog.tags.some((tag) => selectedTags.includes(tag))
        )
      : blogList;

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setIsDropdownOpen(false);
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Blog - Tech Recruiter</title>
        <meta
          name="description"
          content="A collection of blog posts on tech interviews and coding tutorials."
        />
        <meta
          name="keywords"
          content="tech, interviews, javascript, react, node.js, backend, frontend"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/blog" />
      </Head>

      <div className="container mx-auto px-4 pb-8 max-w-[75rem]">
       
        <div className="mx-auto max-w-[75rem]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold mb-8">Blog Posts</h1>

            <div className="relative" ref={dropdownRef}>
              <button
                className="w-48 px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Filter by tag
                <ChevronDown className="float-right h-5 w-5 text-gray-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[15rem]">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-500 hover:bg-blue-300 focus:outline-none"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[1rem]">
            {filteredBlogs.map((blog) => (
              <a
                key={blog.id}
                href={`${blog.link}`}
                className="bg-white rounded-lg overflow-hidden border-[1px] border-background transition-shadow duration-300 hover:shadow-md flex flex-col"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                </div>
                <div className="px-6 py-4 bg-background bg-opacity-50 mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{blog.views} views</span>
                    </div>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
