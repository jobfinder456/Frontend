"use client"
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import axios from "axios"
import JobCard from "@/components/JobCard";
import useDebounce from "@/hooks/useDebounce";

export default function page() {

  const [post, setPost] = useState([]);
  const [loc, setLoc] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 500);
  const debouncedLoc = useDebounce(loc, 500);

  useEffect(() => {
    async function getJob() {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/list?page=${page}&search=${debouncedSearchTerm}&loc=${debouncedLoc}`;
        const response = await axios.get(url);
        console.log("called - ", url)
        setPost(prevPost => [...prevPost, ...response.data.all.rows]);
      } catch (error) {
        console.log(error);
      }
    }

    getJob();
  }, [debouncedSearchTerm, debouncedLoc, page]);

  return (
    <div className="w-[100%] flex flex-col items-center justify-center gap-[2rem] p-[1rem]">
      
      <Navbar />

      <div className="p-[1rem] md:p-[2rem] max-w-[80rem] mx-auto bg-blue-700 rounded-[20px] md:rounded-[40px]">

        <h1 className="text-[2rem] md:text-[3rem] text-white leading-[2.5rem]">Get your dream job today</h1>
        <h3 className="text-[#ffffffbf] text-[0.85rem] md:text-[1.2rem] mt-[0.5rem] md:mt-[1.5rem]">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing staartups </h3>

        <Search setLoc={setLoc} setSearch={setSearch} />

      </div>

      <div className="w-[100%] md:p-[2rem] max-w-[72rem] mx-auto flex flex-col items-start justify-start gap-[1rem] md:gap-[2rem]">

        <h2 className="text-[20px] md:text-[32px] font-medium pl-[1rem]">Latest Jobs</h2>

        
        <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">

        {post.map((job, index) => (
          <JobCard  key={`${job.id}-${page}-${index}`}
                    id={job.id}
                    jobTitle={job.job_title}
                    companyName={job.company_name}
                    isRemote={job.remote}
                    loc={job.work_loc}
                    img={job.logo_url} />
        ))}

        </div>

      </div>

      <button className="px-[1rem] py-[0.5rem] bg-zinc-100 rounded-[8px]" onClick={() => setPage(page + 1)}>Show more results</button>

    </div>
  );
}
