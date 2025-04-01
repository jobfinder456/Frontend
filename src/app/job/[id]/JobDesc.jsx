"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function JobDescription({ description }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure it's mounted before rendering
  }, []);

  if (!mounted) return <p>Loading...</p>; // Prevent hydration error

  return <ReactQuill value={description} readOnly={true} theme="bubble" />;
}
