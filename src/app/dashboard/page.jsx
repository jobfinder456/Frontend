"use client";

import Navbar from "@/components/Navbar";
import withAuth from "@/components/WithAuth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import { RxExternalLink } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Stats from "./stats";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [postData, setPostData] = useState([]);
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [page, setPage] = useState(1); // Current page

  // Fetch jobs function
  const fetchJobs = async (isLoadMore = false) => {
    setLoad(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs?page=${page}`,
        { withCredentials: true }
      );

      const newJobs = response.data.all.jobResult;

      setPostData((prevJobs) =>
        isLoadMore ? [...prevJobs, ...newJobs] : newJobs
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page
    fetchJobs(true); // Fetch new jobs and append
  };

  const onDelete = async (id) => {
    try {
      setLoad(true);
      console.log(id);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id}`,
        { withCredentials: true }
      );
      toast("Deleted Successfully");
      setModal(false);
      setPostIdToDelete(null);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoad(false);
      window.location.reload();
    }
  };

  const onBulkPay = async () => {
    try {
      setLoad(true);
      const unLiveJobIds = postData.reduce((acc, job) => {
        if (!job.is_ok) {
          acc.push(job.id);
        }
        return acc;
      }, []);
      console.log(unLiveJobIds);
      onPay(unLiveJobIds);

      // Add logic for bulk payment here
    } catch (error) {
      console.log(error);
    }
  };

  const toggleJobSelection = (jobId) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId)
        : [...prevSelected, jobId]
    );
  };

  return (
    <div className="relative max-w-[73.75rem] mx-auto min-h-screen overflow-hidden px-[1rem]">
      <Navbar />
      <Toaster />
      {load && <Loader />}
      {modal && (
        <Modal
          title="Are you sure you want to delete"
          button1Title="No"
          button2Title="Yes"
          button1Action={() => setModal(false)}
          button2Action={() => onDelete(postIdToDelete)}
        />
      )}
      <div
        className={`flex flex-col justify-start items-start gap-[1rem] ${
          load ? "opacity-50" : null
        }`}
      >
        <Stats onBulkPay={onBulkPay} />
        <div className="flex justify-between w-[100%]">
          <button className="bg-accent-blue-1 text-white px-[1rem] py-[0.5rem] rounded-[8px] opacity-0">
            Pay
          </button>

          {selectedJobs.length > 0 && (
            <button
              onClick={() => console.log(selectedJobs)}
              className="bg-accent-blue-1 text-white px-[1rem] py-[0.5rem] rounded-[8px]"
            >
              Pay
            </button>
          )}
        </div>

        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-background text-base-2">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-[4px]">
                  Select
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Impessions
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created By
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-[4px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {postData.length > 0 ? (
                postData.map((post) => (
                  <tr
                    key={post.id}
                    className="bg-white hover:bg-background hover:bg-opacity-30 rounded-[8px]"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(post.id)}
                        onChange={() => toggleJobSelection(post.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                    </td>
                    <td className="text-sm px-6 py-4">
                      {dayjs().diff(dayjs(post.last_update), "hours") < 24
                        ? dayjs(post.last_update).fromNow()
                        : dayjs(post.last_update).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <Link
                        href={`/job/${post.id}`}
                        className="flex items-center gap-2"
                      >
                        {post.job_title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{post.company_name || "N/A"}</td>
                    <td className="px-6 py-4">{post.impressions || "N/A"}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/pay?jobId=${[post.id]}`)}
                        className="flex items-center gap-2"
                      >
                        {post.is_ok ? (
                          "Success"
                        ) : (
                          <>
                            Payment Needed!
                            <RxExternalLink size={24} />
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">{post.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/editpost/${post.id}`}
                          className="bg-accent-blue-2 opacity-75 text-accent-blue-1 p-2 rounded hover:opacity-100"
                        >
                          <FaRegEdit />
                        </Link>
                        <button
                          onClick={() => {
                            setModal(true);
                            setPostIdToDelete(post.id);
                          }}
                          className="bg-accent-red-2 opacity-75 text-accent-red-1 p-2 rounded hover:opacity-100"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-[2rem] justify-center items-center py-[2rem]">
                      <img
                        className="w-[96px] md:w-[156px]"
                        src="/images/notFound.svg"
                        alt="No jobs"
                      />
                      <h1>No jobs to show please create one</h1>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleLoadMore}
          disabled={load}
          className="mt-4 mx-auto bg-background text-base-1 text-xs px-4 py-2 rounded"
        >
          {load ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default withAuth(Page);
