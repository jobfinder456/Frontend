
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import JobCard from "@/components/JobCard";
import Link from 'next/link'

export default function Home() {

  const latestPosts = [
    {
      id: 56,
      job_title: "SDE",
      company_name: "Stripe",
      remote: true,
      loc: "Bangalore",
      logo_url: ''
    },
    {
      id: 58,
      job_title: "SDE-II",
      company_name: "Stripe",
      remote: false,
      work_loc: "Bangalore",
      logo_url: ''
    },
    {
      id: 58,
      job_title: "SDE-II",
      company_name: "Stripe",
      remote: false,
      work_loc: "Bangalore",
      logo_url: ''
    }
  ]  

  return (
    <div className="w-[100%] flex flex-col items-center justify-center gap-[2rem] p-[1rem]">
      
      <Navbar />

      <div className="text-center flex flex-col items-center justify-center gap-[1rem]">

        <h1 className="text-[4rem] font-light"><bold className="font-medium">Get</bold> your dream <bold className="font-medium">job today</bold></h1>

        <h3 className="w-[800px] text-[20px]">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing startups </h3>
        
        <Link href={'/search'} className="mt-[1rem] text-[20px] p-[16px] button-primary bg-accent-blue-1 border-accent-blue-1">Browse Jobs Now</Link>

      </div>

      <div className="w-[100%] md:p-[2rem] max-w-[72rem] mx-auto flex flex-col items-start justify-start gap-[1rem] md:gap-[2rem]">

        <h2 className="text-[20px] md:text-[32px] font-medium pl-[1rem]">Latest Jobs</h2>

        
        <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">

        {latestPosts.map((job) => (
          <JobCard  key={job.id}
                    id={job.id}
                    jobTitle={job.job_title}
                    companyName={job.company_name}
                    isRemote={job.remote}
                    loc={job.work_loc} />
        ))}

        </div>

      </div>

    </div>
  );
}
