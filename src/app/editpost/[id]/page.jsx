"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "@/components/Form";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "@/components/NotFound";

function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [jobDetails, setJobDetails] = useState({
    job_title: "", //
    work_loc: "", //
    remote: false, //
    job_link: "", //
    commitment: "",
    description: "",
    name: "",
    email: "",
    level: "",
    compensation: "",
    categories: "",
    company_profile_id: "",
  });
  const [load, setLoad] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getJobDetails() {
      try {
        setLoad(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id}`,
          {
            withCredentials: true,
          }
        );
        
        if (response.data === 0) {
          setNotFound(true);
        } else {
          const jobData = response.data;
          console.log("her1e", jobData)
          setJobDetails({
            company_profile_id: jobData.company_profile_id,
            company_name: jobData.company_name,
            website: jobData.website,
            job_title: jobData.job_title,
            work_loc: jobData.work_loc,
            commitment: jobData.commitment,
            remote: jobData.remote,
            job_link: jobData.job_link,
            description: jobData.description,
            is_ok: jobData.is_ok,
            categories: jobData.categories,
            level: jobData.level,
            compensation: jobData.compensation,
            name: jobData.name,
            email: jobData.email,
          });
        }
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      } finally {
        setLoad(false);
      }
    }
    getJobDetails();
  }, [id]);

  const onSubmit = async () => {
    try {
      setLoad(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id}`,
        jobDetails,
        {
          withCredentials: true,
        }
      );
      
      toast("Job Updated Successfully");
      console.log(response);
      router.push(`/job/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  if (notFound) {
    return <NotFound></NotFound>;
  }

  return (
    <div className="relative max-w-[73.75rem] mx-auto">
      <Navbar />

      <Toaster />

      {load ? <Loader></Loader> : null}

      <div
        className={`max-w-[980px] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] p-[1rem] ${
          load ? "opacity-50" : null
        }`}
      >
        <h1 className="pl-[1rem] text-[24px] md:text-[2rem] leading-[2rem] md:leading-[2.5rem] font-light">
          Edit your Job Post - <span className="font-medium">ID {id}</span>
        </h1>
        <Form
          onSubmit={onSubmit}
          setJobDetails={setJobDetails}
          jobDetails={jobDetails}
          isEdit={true}
        />
      </div>
    </div>
  );
}

export default Page;
