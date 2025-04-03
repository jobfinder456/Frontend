import React from "react";
import Head from "next/head";
import JobDescription from "./JobDesc";
import NotFound from "@/components/NotFound";
import EmailCollector from "@/components/EmailCollector";
import DOMPurify from "isomorphic-dompurify";

async function getJobDetails(id) {
  try {
    id = id.split("-");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id.pop()}`,
      { cache: "no-store" } // Ensures fresh data
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = params;
  // Log the job ID for debugging
  const details = await getJobDetails(id);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(details?.description || "")
  });

  if (!details) {
    return <NotFound />;
  }

  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: details.job_title,
    description: details.description.replace(/(<([^>]+)>)/gi, ""),
    datePosted: details.date_posted || "",
    validThrough: details.valid_through || "",
    employmentType: details.commitment || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: details.company_name,
      sameAs: details.website || "",
      logo: details.image_url || "",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: details.address || "",
        addressLocality: details.work_loc || "Unknown",
        addressRegion: details.state || "",
        postalCode: details.zip_code || "",
        addressCountry: details.country || "Unknown",
      },
    },
    jobLocationType: details.remote ? "TELECOMMUTE" : "OnSite",
    applicantLocationRequirements: details.remote
      ? { "@type": "Country", name: "Remote" }
      : undefined,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        value: details.compensation || 0,
        unitText: "YEAR",
      },
    },
  };

  return (
    <div className="relative max-w-[73.75rem] mx-auto flex flex-col justify-between mb-[2rem]">
      <Head>
        <title>{`${details.job_title} at ${details.company_name}`}</title>
        <meta
          name="description"
          content={`${details.company_name} is hiring for ${details.job_title} in ${details.work_loc}`}
        />
        {/* <meta
          name="description"
          content={details.description.replace(/(<([^>]+)>)/gi, "")} // Remove HTML tags
        /> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://yourwebsite.com/jobs/${id}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      </Head>

      <div className="relative w-[100%] mx-auto flex flex-col justify-center gap-[2rem] md:gap-[0rem] px-[1rem] text-[14px] md:text-[1rem] lg:text-[20px]">
        <div className="w-[100%] flex flex-col items-center justify-center gap-[1rem] mt-[1rem]">
          <a
            href={details.website}
            className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-zinc-100 rounded-md"
          >
            {details.image_url ? (
              <img
                src={details.image_url}
                alt="company_logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center h-full text-white">
                {details.company_name}
              </span>
            )}
          </a>

          <h3 className="text-[1rem] md:text-[20px] font-medium text-base-2">
            {details.company_name}
          </h3>
          <h1 className="text-[28px] md:text-[40px] font-bold text-base-1 mb-[1rem] md:mb-[3rem] text-center">
            {details.job_title}
          </h1>
        </div>

        <div className="relative flex flex-col md:flex-row justify-center items-start gap-[20px]">
          <div className="flex-grow w-[100%] bg-background rounded-[20px] flex flex-col gap-[40px] items-start justify-start p-[20px]">
            <div className="flex flex-wrap justify-start items-center gap-[0.5rem] md:gap-[20px]">
              <div className="bg-[#DBDBDB] px-[8px] py-[4px] md:px-[12px] md:py-[8px] rounded-[8px]">
                {details.work_loc} {details.remote ? " | Remote" : null}
              </div>

              <div className="bg-[#DBDBDB] px-[8px] py-[4px] md:px-[12px] md:py-[8px] rounded-[8px]">
                {details.commitment}
              </div>

              {details.compensation && (
                <div className="bg-[#DBDBDB] px-[8px] py-[4px] md:px-[12px] md:py-[8px] rounded-[8px]">
                  ${details.compensation}
                </div>
              )}
              <div className="bg-[#DBDBDB] px-[8px] py-[4px] md:px-[12px] md:py-[8px] rounded-[8px]">
                {details.level}
              </div>
            </div>
            
              {details.description && (
                <div
                  className=""
                  dangerouslySetInnerHTML={sanitizedData()}
                />
              )}
            
          </div>

          <div className="top-[20px] sticky w-[100%] md:w-[40%] flex flex-col gap-[20px]">
            <a
              href={`${details.job_link}?utm_source=getjobs.today&utm_medium=organic`}
              className="bg-accent-blue-2 p-[1rem] text-white rounded-[16px] flex items-center"
            >
              <h3 className="bg-accent-blue-1 text-center w-[100%] p-[1rem] rounded-[12px] font-medium">
                Apply for this job
              </h3>
            </a>

            <EmailCollector isHome={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
