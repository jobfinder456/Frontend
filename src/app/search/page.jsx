"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import JobCard from '@/components/JobCard';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link'
import Loader from '@/components/Loader';

export default function Page() {

  const [load, setLoad] = useState(false)
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loc, setLoc] = useState('');
  const [page, setPage] = useState(1);
  const [searchChanged, setSearchChanged] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);
  const debouncedLoc = useDebounce(loc, 500);

  useEffect(() => {
    async function getJob() {
      try {
        setLoad(true)
        const url = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/list?page=${page}&search=${debouncedSearchTerm}&loc=${debouncedLoc}`;
        const response = await axios.get(url);
        console.log(response);
        console.log('called - ', url);
        setPosts(prevPosts => [...prevPosts, ...response.data.all]);
        //setPosts(response.data.all); // Append new posts to existing posts
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false)
      }
    }

    getJob();
  }, [debouncedSearchTerm, debouncedLoc, page, searchChanged]);

  const handleSearchChange = value => {
    setSearch(value);
    setPage(1)
    setPosts([]);
    setSearchChanged(true);
  };

  const handleLocationChange = value => {
    setLoc(value);
    setPage(1)
    setPosts([]);
    setSearchChanged(true);
  };

  const handleShowMoreResults = () => {
    setPage(prevPage => prevPage + 1); // Increment page number
  };

  return (
    <div className=" max-w-[73.75rem] mx-auto flex flex-col items-center justify-center gap-[2rem]">
      <Navbar />

      <div className="flex flex-col gap-[2rem] px-[20px]">
        
      <div className="w-[100%] text-center flex flex-col items-center justify-center gap-[1rem]">

          <h1 className="text-[2.5rem] md:text-[4rem] font-light leading-tight"><span className="font-medium">Get</span> your dream <span className="font-medium">job today</span></h1>

          <h3 className="md:px-[4rem] text-[14px] md:text-[20px] ">Boost your career growth, by joining one of the the latest growing company, browse through our immense library of jobs of the growing startups </h3>

      </div>

        <Search setLocValue={handleLocationChange} setSearchValue={handleSearchChange} />

      </div>

      {/* { load ? <Loader></Loader> : null} */}

        <div className="w-[100%] flex flex-col justify-center items-center px-[20px]">
          {posts.length > 0 ? (
            posts.map((job, index) => (
              <JobCard
                key={`${job.id}-${index}`}
                id={job.id}
                jobTitle={job.job_title}
                companyName={job.company_name}
                isRemote={job.remote}
                loc={job.work_loc}
                img={job.logo_url}
              />
            ))
          ) : (
            <p>No jobs found </p>
          )}
        </div>

      {posts.length > 0 && (
        <button className="px-[1rem] py-[0.5rem] bg-background text-[12px] rounded-[8px] font-light" onClick={handleShowMoreResults}>
          Show more results
        </button>
      )}
    </div>
  );
}