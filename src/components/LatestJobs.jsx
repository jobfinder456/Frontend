import JobCard from "./JobCard";

export default async function LatestJobs() {
  const categories = [
    { name: "Tech Jobs", category: "tech" },
    { name: "Sales Jobs", category: "sales" },
    { name: "Design Jobs", category: "design" },
  ];

  const baseApiUrl = `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/list?search=&loc=&remote=&commitment=&level=&page=1`;

  try {
    // Fetch jobs for each category
    const jobPromises = categories.map(({ category }) =>
      fetch(`${baseApiUrl}&categories=${category}`, {
        next: {
          revalidate: 36000,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs for category: ${category}`);
        }
        return response.json();
      })
    );

    // Wait for all API calls to complete
    const jobData = await Promise.all(jobPromises);

    return (
      <div className="w-full flex flex-col gap-8">
        {/* Latest Jobs Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Jobs</h2>
          <div className="flex flex-col justify-center items-center gap-4">
            {jobData[0]?.all?.map((job) => (
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
            ))}
          </div>
        </section>

        {/* Other Categories */}
        {categories.map(({ name, category }, index) => (
          <section key={category}>
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <div className="flex flex-col justify-center items-center gap-4">
              {jobData[index]?.all?.map((job) => (
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
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return (
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p className="text-lg text-red-500">Failed to load jobs. Please try again later.</p>
      </div>
    );
  }
}
