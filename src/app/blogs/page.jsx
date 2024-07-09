"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

function BlogsPage() {
  return (
    <div className="relative max-w-[73.75rem] mx-auto min-h-screen overflow-hidden">
      <Navbar />
      {false && <Loader />}
      <div className="p-[2rem] flex flex-col gap-[1rem]">
        <h1 className="text-[1rem] md:text-[1.5rem] font-light leading-tight text-center mb-[2rem]">
          Learning Center
        </h1>
        <div className="flex flex-col gap-[1rem]">
          <Link
            href={"/"}
            className="bg-background rounded-[0.5rem] p-[1rem] text-base-1 hover:pl-[1.25rem] hover:text-accent-blue-1 transition-all"
          >
            <h3 className="text-[2rem] font-semibold">
              The Future of AI: Trends to Watch in 2024
            </h3>
            <p>
              Explore the top trends shaping the future of artificial
              intelligence in 2024, from AI ethics to advancements in machine
              learning.
            </p>
          </Link>

          <Link
            href={"/"}
            className="bg-background rounded-[0.5rem] p-[1rem] text-base-1 hover:pl-[1.25rem] hover:text-accent-blue-1 transition-all"
          >
            <h3 className="text-[1.5rem] font-semibold">
              5 Books Every Aspiring Developer Should Read
            </h3>
            <p>
              Discover five must-read books that can provide aspiring developers
              with valuable insights and skills to excel in their careers.
            </p>
          </Link>

          <Link
            href={"/"}
            className="bg-background rounded-[0.5rem] p-[1rem] text-base-1 hover:pl-[1.25rem] hover:text-accent-blue-1 transition-all"
          >
            <h3 className="text-[1.5rem] font-semibold">
              Mastering Remote Work: Tips for Productivity
            </h3>
            <p>
              Learn how to maximize your productivity while working remotely
              with these practical tips and strategies from industry experts.
            </p>
          </Link>

          <Link
            href={"/"}
            className="bg-background rounded-[0.5rem] p-[1rem] text-base-1 hover:pl-[1.25rem] hover:text-accent-blue-1 transition-all"
          >
            <h3 className="text-[1.5rem] font-semibold">
              Cybersecurity in 2024: Protecting Your Digital Life
            </h3>
            <p>
              Stay ahead of cyber threats in 2024 by understanding the latest
              cybersecurity practices and how to protect your digital assets.
            </p>
          </Link>

          <Link
            href={"/"}
            className="bg-background rounded-[0.5rem] p-[1rem] text-base-1 hover:pl-[1.25rem] hover:text-accent-blue-1 transition-all"
          >
            <h3 className="text-[1.5rem] font-semibold">
              The Rise of Quantum Computing: What You Need to Know
            </h3>
            <p>
              Quantum computing is set to revolutionize technology. Discover
              what it is, how it works, and its potential impact on various
              industries.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;
