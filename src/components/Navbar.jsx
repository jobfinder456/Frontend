import React from "react";
import Link from "next/link";
import ForEmp from "./ForEmp";

export default function Navbar() {
  return (
    <div className="w-[100%] py-[1rem]  flex justify-between items-center px-[12px] sm:px-[20px]">
      <Link
        href={"/"}
        className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem] flex items-center justify-center"
      >
        <img src="/images/logo.svg" alt="logo" />
      </Link>

      <div className="flex items-center gap-[1rem]">
        <a href="/blogs">Blogs</a>
        <ForEmp />
      </div>

      {/* <div className="flex justify-center items-center text-[0.95rem] md:text-[16px] gap-[0.5rem] md:gap-[1rem]">
        <ForEmp />

        <Link href={"/postjob"} className="button-primary">
          Post a Job
        </Link>
      </div> */}
    </div>
  );
}
