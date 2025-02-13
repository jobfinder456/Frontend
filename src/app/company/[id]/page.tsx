"use client";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function CompanyPage() {
  const pathname = usePathname(); // Get the current path
  const [data, setData] = useState({
    company: null,
    jobs: [],
    isLoading: true,
  });

  // Extract the company name from the pathname
  const companyName = pathname?.split("/").pop(); // Extract the last part of the path

  // Fetch the company and job data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!companyName) return;

        // Fetch company info and jobs concurrently
        const [companyRes, jobsRes] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/${companyName}`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/info/${companyName}`
          ),
        ]);

        console.log(companyRes);
        console.log(jobsRes);

        setData({
          company: companyRes.data.data,
          jobs: jobsRes.data.data.jobs || [],
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ company: null, jobs: [], isLoading: false });
      }
    };

    fetchCompanyData();
  }, [companyName]);

  const { company, jobs, isLoading } = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company data not found.</div>;
  }

  return (
    <div className="  max-w-[75rem] mx-auto mb-[2rem]">
      <Navbar />
      <div className="flex flex-col gap-[1rem] justify-start items-start px-[1rem] max-w-[60rem] mx-auto">
        <div className="flex gap-[1rem] justify-center items-center ">
          <img
            src={company.imageUrl}
            alt={`${company.company} logo`}
            className="w-20 h-20 rounded-[1rem] bg-background"
          />
          <div>
            <h1 className="text-[1.5rem] font-bold">{company.company}</h1>
            <h5>has {company.totalJobs} open positions</h5>
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center px-[20px]">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                jobTitle={job.job_title}
                companyName={job.company_name}
                isRemote={job.remote}
                loc={job.work_loc}
                img={job.image_url}
                jobLink={job.job_link}
              />
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
