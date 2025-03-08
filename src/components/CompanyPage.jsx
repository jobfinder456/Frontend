"use client";

import JobCard from "@/components/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

function CompanyPage({ companyId }) {
  console.log("Rendering CompanyPage with ID:", companyId);

  const [data, setData] = useState({
    company: null,
    jobs: [],
    isLoading: true,
  });

  useEffect(() => {
    if (!companyId) return;

    const fetchCompanyData = async () => {
      try {
        console.log("Fetching data for:", companyId);
        
        const [companyRes, jobsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/${companyId}`),
          axios.get(`${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/info/${companyId}`),
        ]);

        setData({
          company: companyRes.data.data,
          jobs: jobsRes.data.data.jobs || [],
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        setData({ company: null, jobs: [], isLoading: false });
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const { company, jobs, isLoading } = data;

  if (isLoading) return <div>Loading...</div>;
  if (!company) return <div>Company not found.</div>;

  return (
    <div className="max-w-[75rem] mx-auto mb-8 px-4">
      {/* Dynamic Page Title */}
      <Head>
        <title>{company.company} - Job Listings</title>
        <meta name="description" content={`Explore job openings at ${company.company}.`} />
      </Head>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg">
          <img
            src={company.imageUrl}
            alt={`${company.company} logo`}
            className="w-16 h-16 rounded-lg bg-white"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold">{company.company}</h1>
            <h5 className="text-sm">Has {company.totalJobs} open positions</h5>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
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
                commitment={job.commitment}
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