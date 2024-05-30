import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Navbar from "./Navbar";
import Link from "next/link";

function NotFound() {
  return (
    <div className="max-w-[73.75rem] mx-auto flex flex-col justify-center items-center">
      <Navbar></Navbar>

      <div className="w-[100%] min-h-screen flex flex-col md:flex-row gap-[2rem] lg:gap-[4rem] justify-center items-center">
        <img
          className="w-[160px] md:w-[280px]"
          src="/images/notFound.svg"
        ></img>

        <div className="flex flex-col md:items-start justify-center items-center md:justify-start gap-[0.2rem] text-base-1">
          <h1 className="text-[32px] md:text-[48px] font-semibold">404</h1>

          <p className="text-[1rem] md:text-[20px] text-center md:text-start">
            The page you trying to visit is <br></br> no-more or never existed
            before.
          </p>

          <Link
            href={"/"}
            className="button-secondary flex gap-[0.5rem] mt-[1rem]"
          >
            Go back to home page <BsArrowRight></BsArrowRight>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
