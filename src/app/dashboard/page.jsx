"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { RxExternalLink } from "react-icons/rx";
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';
import DashboardTable from '@/components/DashboardTable';

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [postData, setPostData] = useState([]);
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [notLive, setNotLive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jf_token");
      if (!token) {
        router.push('/signinwithotp');
        return;
      }

      const mail = localStorage.getItem("userMail");
      if (!mail) {
        try {
          const responseVerify = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/verifyuser`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const userEmail = responseVerify.data.email;
          localStorage.setItem('userMail', userEmail);
          setEmail(userEmail);
          return userEmail;
        } catch (error) {
          console.error("Error verifying user:", error);
          setModal(true);
          setLoad(false);
          return null;
        }
      } else {
        setEmail(mail);
        return mail;
      }
    };

    const fetchPostData = async (email) => {
      if (!email) return;

      try {
        const token = localStorage.getItem("jf_token");
        const responseSubmit = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/users-list`, { email }, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setPostData(responseSubmit.data.all.jobResult);
        setNotLive(responseSubmit.data.all.is_ok);
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast('Please login again');
      } finally {
        setLoad(false);
      }
    };

    const init = async () => {
      const userEmail = await fetchData();
      await fetchPostData(userEmail);
    };

    init();
  }, [router]);

  const onDelete = async (id) => {
    try {
      setLoad(true);
      const token = localStorage.getItem("jf_token") || false;
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
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

  const onPay = async (jobId) => {
    try {
      setLoad(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/create-payment`, { userId: email, jobId, price: 0.9 });
      const { orderId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: 0.9 * 100, // Amount is in currency subunits. Default currency is INR.
        currency: "INR",
        name: "Your Company Name",
        description: "Payment for Job Posting",
        order_id: orderId,
        handler: function (response) {
          alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
          router.push('/success');
        },
        prefill: {
          name: "Your Name",
          email: email,
          contact: "9999999999"
        },
        notes: {
          address: "Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Payment failed. Error: ${response.error.reason}`);
      });
      rzp1.open();
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className='relative max-w-[73.75rem] mx-auto min-h-screen relative overflow-hidden'>
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
      <div className={`flex flex-col justify-start items-start gap-[4rem] p-[20px] ${load ? 'opacity-50' : null}`}>
        <div className='w-[100%] bg-background flex flex-wrap gap-[0.5rem] md:gap-[1rem] p-[0.5rem] md:p-[1rem] rounded-[24px]'>
          <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>
            <h3 className='text-[1rem] md:text-[1.2rem] font-medium text-accent-blue-1'>Coming Soon !</h3>
            <span className='text-[14px] md:text-[16px]'>Total impressions on your job posts</span>
          </div>
          <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>
            <h3 className='text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1'>{postData.length - notLive}</h3>
            <span className='text-[14px] md:text-[16px]'>Jobs are live now</span>
          </div>
          <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>
            <h3 className='text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1'>{notLive}</h3>
            <span className='text-[14px] md:text-[16px]'>Jobs require payment. <Link href={'/checkout'} className='flex items-center gap-[0.5rem] underline'>Pay Now <RxExternalLink /></Link></span>
          </div>
        </div>
        <div className='relative overflow-x-scroll w-full'>
          <div className='flex flex-col w-[36rem] sm:w-[100%] justify-between'>
            <DashboardTable
              date='22-09-24'
              postId=''
              jobTitle="Job Title"
              isOk=''
              onPay={() => { }}
              createdBy=''
              setModal={() => { }}
              setPostIdToDelete={() => { }}
              isHeader={true}
            />
            {postData.length > 0 ? (postData.map((post) => (
              <DashboardTable
                key={post.id}
                date='22-09-24'
                postId={post.id}
                jobTitle={post.job_title}
                onPay={() => onPay(post.id)}
                isOk={post.is_ok}
                createdBy={post.name}
                setModal={setModal}
                setPostIdToDelete={setPostIdToDelete}
                isHeader={false}
              />
            ))) : (
              <div className='flex flex-col gap-[2rem] justify-center items-center py-[2rem]'>
                <img className='w-[96px] md:w-[156px]' src='/images/notFound.svg' alt='No jobs' />
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
