
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

      <Link href={'/search'} className="p-[1rem] md:p-[2rem] max-w-[80rem] mx-auto bg-blue-700 rounded-[20px] md:rounded-[40px]">

        <h1 className="text-[2rem] md:text-[3rem] text-white leading-[2.5rem]">Get your dream job today</h1>
        <h3 className="text-[#ffffffbf] text-[0.85rem] md:text-[1.2rem] mt-[0.5rem] md:mt-[1.5rem]">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing staartups </h3>

        <Search />

      </Link>

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
