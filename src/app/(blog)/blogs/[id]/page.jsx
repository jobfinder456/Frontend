"use client"; // Ensure this is client-side

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Head from "next/head";

export default function BlogDetail() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/api/v1/blogs/${id}`);
        if (response.data.success) {
          setBlog(response.data.blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <>
      <Head>
        <title>{blog.title} - Blog</title>
        <meta name="description" content={blog.body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)} />
      </Head>

      <div className="container mx-auto px-4 max-w-[75rem] mb-20 min-h-screen">
        <h1 className="text-4xl font-bold text-center my-6">{blog.title}</h1>
        <div className="prose max-w-[64rem] mx-auto" dangerouslySetInnerHTML={{ __html: blog.body }} />
      </div>
    </>
  );
}
