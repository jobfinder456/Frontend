import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto ">
      <Navbar></Navbar>

      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col md:flex-row gap-[1rem] my-[2rem]">
          <div className="md:w-[50%] flex-grow flex flex-col text-base-1 bg-white p-[1rem] rounded-[12px] gap-[0.5rem]">
            <h1 className=" text-[28px] md:text-[32px] font-bold">
              299
              <span className="text-[0.75rem] font-normal">
                {" "}
                / per job for 31 days{" "}
              </span>
            </h1>

            <hr className="w-[100%] border-base-2 mt-[0.5rem] mb-[0.75rem]"></hr>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                Job post will remain active for 31 days
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center mt-1">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                Gain exposure to the best talent pool
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                Your job will be added to Google Jobs
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                We will market your job post through various media channels
              </h3>
            </div>

            <Link
              href={"/postjob"}
              className="button-primary text-center mt-[2rem] bg-accent-blue-1 border-accent-blue-1"
            >
              Start Hiring
            </Link>
          </div>

          <div className="md:w-[50%] flex-grow flex flex-col  text-base-1 bg-white p-[1rem] rounded-[12px] gap-[0.5rem]">
            <h1 className=" text-[28px] md:text-[32px] font-bold">
              Custom
              <span className="text-[0.75rem] font-normal">
                {" "}
                / best for bulk posts{" "}
              </span>
            </h1>

            <hr className="w-[100%] border-base-2 mt-[0.5rem] mb-[0.75rem]"></hr>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                All features of normal posting +
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <FaCheck />
              </div>

              <h3 className="title-sub font-medium text-start">
                Save up to 60% on bulk job posts.
              </h3>
            </div>

            <Link
              href={"/contact"}
              className="button-primary text-center mt-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
