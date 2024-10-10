"use client";

import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import DashboardTable from "@/components/DashboardTable";
import Stats from "./stats";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [postData, setPostData] = useState([]);
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [notLive, setNotLive] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const responseSubmit = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs`,
        {
          withCredentials: true,
        }
      );
      setPostData(responseSubmit.data.all.jobResult);
      setNotLive(responseSubmit.data.all.is_ok);
    } catch (error) {
      console.error("Error fetching post data:", error);
      toast("Please login again");
    } finally {
      setLoad(false);
    }
  };

  const onDelete = async (id) => {
    try {
      setLoad(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${id}`,
        { withCredentials: true }
      );
      toast("Deleted Successfully");
      setModal(false);
      setPostIdToDelete(null);
    } catch (error) {
      console.log(error);
    } finally {
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

  const onPay = async (jobId) => {
    try {
      setLoad(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/create-payment`,
        { userId: email, jobId, price: 29900 }, {withCredentials: true }
      );
      const { orderId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: 29900, // Amount is in currency subunits. Default currency is INR.
        currency: "INR",
        name: "Get Jobs",
        description: "Payment for Job Posting",
        order_id: orderId,
        handler: async function (response) {
          const pay_id = `${response.razorpay_payment_id}`;
          const ord_id = orderId;
          const sign = `${response.razorpay_signature}`;
          const validateRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/verify-payment`,
            { raz_pay_id: pay_id, raz_ord_id: ord_id, raz_sign: sign, jobId} , {withCredentials: true }
          );
          //const jsonRes = await validateRes.json();
          console.log(validateRes);
          router.push(`/success?jobId=${jobId}&payId=${pay_id}`);
        },
        prefill: {
          name: "Your Name",
          email: email,
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(options);
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(`Payment failed. Error: ${response.error.reason}`);
        });
        rzp1.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
      rzp1.open();
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="relative max-w-[73.75rem] mx-auto min-h-screen overflow-hidden">
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
        className={`flex flex-col justify-start items-start gap-[4rem] p-[20px] ${
          load ? "opacity-50" : null
        }`}
      >
        <Stats notLive={notLive} postData={postData} onBulkPay={onBulkPay} />
        <div className="relative overflow-x-scroll w-full">
          <div className="flex flex-col w-[36rem] sm:w-[100%] justify-between">
            <DashboardTable
              date="22-09-24"
              postId=""
              jobTitle="Job Title"
              isOk=""
              onPay={() => {}}
              createdBy=""
              setModal={() => {}}
              setPostIdToDelete={() => {}}
              isHeader={true}
            />
            {postData.length > 0 ? (
              postData.map((post) => (
                <DashboardTable
                  key={post.id}
                  date="22-09-24"
                  postId={post.id}
                  jobTitle={post.job_title}
                  onPay={() => onPay(post.id)}
                  isOk={post.is_ok}
                  createdBy={post.name}
                  setModal={setModal}
                  setPostIdToDelete={setPostIdToDelete}
                  isHeader={false}
                />
              ))
            ) : (
              <div className="flex flex-col gap-[2rem] justify-center items-center py-[2rem]">
                <img
                  className="w-[96px] md:w-[156px]"
                  src="/images/notFound.svg"
                  alt="No jobs"
                />
                <h1>No jobs to show please create one</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
