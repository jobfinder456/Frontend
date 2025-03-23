"use client";
import React from "react";
import EmailCollector from "@/components/EmailCollector";
import Navbar from "@/components/Navbar";
import NotFound from "@/components/NotFound";
import toast, { Toaster } from "react-hot-toast";

const JobDetails = ({ job }) => {
  if (!job) {
    return <NotFound />;
  }

  return (
    <div className="relative max-w-[73.75rem] mx-auto flex flex-col justify-between mb-[2rem]">
      
      <Toaster />

      <div className="relative w-[100%] mx-auto flex flex-col justify-center gap-[2rem] md:gap-[0rem] px-[1rem] text-[14px] md:text-[1rem] lg:text-[20px]">
        <div className="w-[100%] flex flex-col items-center justify-center gap-[1rem] mt-[1rem]">
          <a
            href={job.website}
            className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-zinc-400 rounded-md"
          >
            {job.image_url ? (
              <img
                src={job.image_url}
                alt="company_logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center h-full text-white">
                {job.company_name}
              </span>
            )}
          </a>

          <h3 className="text-[1rem] md:text-[20px] font-medium text-base-2">
            {job.company_name}
          </h3>
          <h1 className="text-[28px] md:text-[40px] font-bold text-base-1 mb-[1rem] md:mb-[3rem] text-center">
            {job.job_title}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-[20px]">
          <div className="flex-grow w-[100%] bg-background rounded-[20px] p-[20px]">
            <div className="flex flex-wrap gap-[20px]">
              <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                {job.work_loc} {job.remote ? " | Remote" : null}
              </div>
              <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                {job.commitment}
              </div>
              {job.compensation && (
                <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                  ${job.compensation}
                </div>
              )}
              <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                {job.level}
              </div>
            </div>

            <div className="mt-6">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </div>

          <div className="sticky top-20 w-full md:w-1/3 flex flex-col gap-6">
            <a
              href={`${job.job_link}?utm_source=your-site&utm_medium=organic`}
              className="bg-blue-600 text-white p-4 rounded-lg text-center"
            >
              Apply for this job
            </a>

            <EmailCollector isHome={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
