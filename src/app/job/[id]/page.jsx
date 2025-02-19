import React, { Suspense } from "react";
import axios from "axios";
import JobDetails from "./JobDetails";
import { generateMetadataFromData } from "./metadata"; // Modify metadata to accept data

export async function generateMetadata({ params }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${params.id}`
    );

    if (!response.data) return { title: "Job Not Found" };

    return generateMetadataFromData(response.data);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Job Not Found" };
  }
}

async function fetchJobDetails(id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id}`
  );
  return response.data;
}

async function Page({ params }) {
  const jobData = await fetchJobDetails(params.id);

  if (!jobData) {
    return <h1>Job Not Found</h1>;
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="container mx-auto p-4">
        <JobDetails details={jobData} />
      </div>
    </Suspense>
  );
}

export default Page;
