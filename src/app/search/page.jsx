"use client"
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import axios from "axios"
import JobCard from "@/components/JobCard";

export default function page() {

  const [post, setPost] = useState([])

  useEffect(() => {

    async function getJob() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/list")
        setPost(response.data.all.rows)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    }

    getJob()

  },[])
  

  return (
    <div className="w-[100%] flex flex-col items-center justify-center gap-[2rem] p-[1rem]">
      
      <Navbar />

      <div className="p-[1rem] md:p-[2rem] max-w-[80rem] mx-auto bg-blue-700 rounded-[20px] md:rounded-[40px]">

        <h1 className="text-[2rem] md:text-[3rem] text-white leading-[2.5rem]">Get your dream job today</h1>
        <h3 className="text-[#ffffffbf] text-[0.85rem] md:text-[1.2rem] mt-[0.5rem] md:mt-[1.5rem]">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing staartups </h3>

        <Search />

      </div>

      <div className="w-[100%] md:p-[2rem] max-w-[72rem] mx-auto flex flex-col items-start justify-start gap-[1rem] md:gap-[2rem]">

        <h2 className="text-[20px] md:text-[32px] font-medium pl-[1rem]">Latest Jobs</h2>

        
        <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">

        {post.map((job) => (
          <JobCard  key={job.id}
                    id={job.id}
                    jobTitle={job.job_title}
                    companyName={job.company_name}
                    isRemote={job.remote}
                    loc={job.work_loc}
                    img={job.logo_url} />
        ))}

        </div>

      </div>

    </div>
  );
}
