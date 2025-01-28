"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuthContext } from "../app/provider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { isAuth } = useAuthContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full max-w-[72rem] mx-auto py-4 flex justify-between items-center z-50 p-[1rem]">
      <Link
        href="/"
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
      >
        <img src="/images/logo.svg" alt="logo" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        <a
          href="/blogs"
          className="cursor-pointer bg-background px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium"
        >
          Study
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer bg-background px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium"
        >
          For Employer
        </button>
        <div
          ref={modalRef}
          className={`${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          } flex flex-col gap-2 absolute top-14 right-0 bg-zinc-50 p-2 rounded-md text-base shadow-lg transition ease-in-out duration-300 z-50 border-[1px] border-zinc-200/75`}
        >
          <a
            href="/business"
            className="cursor-pointer hover:bg-zinc-100 px-4 py-2 rounded-md font-medium"
          >
            What we offer
          </a>
          <a
            href="/postjob"
            className="cursor-pointer hover:bg-zinc-100 px-4 py-2 rounded-md font-medium"
          >
            Post a Job
          </a>
          <a
            href="/dashboard"
            className="cursor-pointer hover:bg-zinc-100 px-4 py-2 rounded-md font-medium"
          >
            Dashboard
          </a>
          {isAuth ? (
            <button
              onClick={() => {
                localStorage.removeItem("getjobs");
                setIsOpen(false);
                router.push("/");
              }}
              className="cursor-pointer hover:bg-red-100 bg-red-50 text-accent-red-1 px-4 py-2 rounded-md font-medium text-start"
            >
              Log Out
            </button>
          ) : (
            <a
              href="/login"
              className="cursor-pointer hover:bg-blue-100 bg-blue-50 text-accent-blue-1 px-4 py-2 rounded-md font-medium"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
