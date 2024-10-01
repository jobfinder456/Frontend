import axios from "axios";
import JobCard from "./JobCard"; // Assuming JobCard is another component

export default async function LatestJobs() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/list?page=1&search=&loc=&remote=`;

    const response = await axios.get(apiUrl, {
      next: {
        revalidate: 36000,
      },
    });
    const data = response.data;


    // Access the 'all' property which contains the job list
    const jobs = data.all;

    // Check if 'jobs' is an array
    if (Array.isArray(jobs)) {
      return (
        <div className="w-[100%] flex flex-col justify-center items-center gap-[0.5rem]">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              jobTitle={job.job_title}
              companyName={job.company_name}
              isRemote={job.remote}
              loc={job.work_loc}
            />
          ))}
        </div>
      );
    } else {
      console.error("Unexpected data format:", jobs);
      return (
        <div className="w-[100%] flex flex-col justify-center items-center gap-[0.5rem]">
          <p>Unexpected data format. Please contact support.</p>
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return (
      <div className="w-[100%] flex flex-col justify-center items-center gap-[0.5rem]">
        <p>Failed to load jobs. Please try again later.</p>
      </div>
    );
  }
}
