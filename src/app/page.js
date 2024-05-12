import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs";

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
    <div className="max-w-[73.75rem] mx-auto flex flex-col items-center justify-center gap-[2rem] p-[1rem]">
      
      <Navbar />

      <div className="w-[100%] text-center flex flex-col items-center justify-center gap-[1rem]">

        <h1 className="text-[2.5rem] md:text-[4rem] font-light leading-tight"><span className="font-medium">Get</span> your dream <span className="font-medium">job today</span></h1>

        <h3 className="md:px-[4rem] text-[14px] md:text-[20px] ">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing startups </h3>

        <div  className="w-[12rem] md:w-[16rem] browse-button ease-in-out flex items-center justify-center gap-[1rem] mt-[1rem] text-[16px] md:text-[20px] p-[12px] md:p-[16px] button-primary bg-accent-blue-1 border-accent-blue-1"
               style={{
                transition: 'width 0.5s ease',
              }}>

          <Link href={'/search'} className="w-[100%]">Browse Jobs Now </Link>

          <BsArrowRight />

        </div>
        

      </div>

      <div className="w-[100%] max-w-[73.75rem] px-[0.5rem] md:px-[2rem] mx-auto flex flex-col items-start justify-start gap-[1rem]">

        <h2 className="text-[20px] md:text-[20px] font-medium">Latest Jobs</h2>

        <div className="w-[100%] flex flex-col justify-center items-center gap-[0.5rem]">

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
