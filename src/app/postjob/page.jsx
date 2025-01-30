"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

function Page() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    job_title: "", //
    work_loc: "", //
    remote: false, //
    job_link: "", //
    commitment: "Fulltime",
    description: "",
    name: "",
    email: "",
    level: "entry",
    compensation: "",
    categories: "tech",
    company_profile_id: "",
  });

  useEffect(() => {
    const isLogin = localStorage.getItem("getjobs") || false;

    console.log(isLogin);
    if (!isLogin) {
      setModal(true);
    }
  }, []);

  const onSubmit = async () => {
    const addHttps = (url) => {
      if (url.startsWith("https://") || url.startsWith("http://")) {
        return url;
      }
      return `https://${url}`;
    };

    const updatedJobDetails = {
      ...jobDetails,
      job_link: addHttps(jobDetails.job_link),
    };

    try {
      setLoad(true);
      console.log(jobDetails);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/insert`,
        updatedJobDetails,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      toast.success("Job successfully posted");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        toast.error("Enter details properly");
      } else {
        setModal(true);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className=" relative max-w-[64rem] mx-auto px-[1rem]">
      {load ? <Loader></Loader> : null}

      {modal ? (
        <Modal
          title="First Sign In to Post a Job"
          button1Title="Sign In /  Create a Account"
          button2Title="false"
          button1Action={() => router.push("/login")}
          button2Action=""
        ></Modal>
      ) : null}

      <div
        className={`relative mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] }`}
      >
        <h1 className="pl-[1rem] text-[24px] md:text-[2rem] leading-[2rem] md:leading-[2.5rem] font-light">
          <span className="font-medium">Recruit top talent!</span> Broadcast
          your job post to thousands of eager job seekers.
        </h1>

        <Form
          onSubmit={onSubmit}
          setJobDetails={setJobDetails}
          jobDetails={jobDetails}
          isEdit={false}
        />
      </div>
    </div>
  );
}

export default Page;
