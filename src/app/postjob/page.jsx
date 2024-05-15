"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Form from '@/components/Form'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/components/Modal'
import Loader from '@/components/Loader'

function Page() { 
  
    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [load, setLoad] = useState(false)
    const [jobDetails, setJobDetails] = useState({
      company_name: '', //
      website: '', //
      job_title: '', //
      image: '',
      work_loc: '', //
      remote: true, //
      job_link: '', //
      commitment: 'Fulltime',
      description: '',
      name: '',
      email: ''
  })

  useEffect(() => {

    const token = localStorage.getItem("jf_token") || false
    if(!token){
      setModal(true)
      return
    }

  },[])
  
  const onSubmit = async () => {
    const addHttps = (url) => url.startsWith("https://") ? url : `https://${url}`;
  
    const updatedJobDetails = {
      ...jobDetails,
      job_link: addHttps(jobDetails.job_link),
      website: addHttps(jobDetails.website)
    };
  
    const token = localStorage.getItem("jf_token") || false;
  
    const formData = new FormData();
    Object.keys(updatedJobDetails).forEach(key => {
      if (key !== "image") {
        formData.append(key, updatedJobDetails[key]);
      }
    });
  
    if (updatedJobDetails.image) {
      formData.append("image", updatedJobDetails.image);
    }
  
    try {
      setLoad(true);
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/insert`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );
  
      toast("Job successfully posted");
      router.push('/dashboard');
  
    } catch (error) {
      console.error(error);
  
      if (error.response && error.response.status === 400) {
        toast("Enter details properly");
      } else {
        setModal(true);
      }
  
    } finally {
      setLoad(false);
    }
  };
  
  
  
    return (

      <div className=' realtive max-w-[73.75rem] mx-auto '>

      <Navbar />

      <Toaster />

      { load ? <Loader></Loader> : null}

      { modal ? <Modal 
                            title="First Sign In to Post a Job"
                            button1Title="Sign In /  Create a Account"
                            button2Title="false"
                            button1Action={() => router.push('/signinwithotp')}
                            button2Action=''
                      ></Modal> 
                      
            : null }

      <div className={`relative max-w-[980px] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] p-[1rem] ${ load || modal ? 'opacity-50' : null}`}>

          
              <h1 className='pl-[1rem] text-[24px] md:text-[2rem] leading-[2rem] md:leading-[2.5rem] font-light'><span className='font-medium'>Recruit top talent!</span> Broadcast your job post to thousands of eager job seekers.</h1>
  
              <Form onSubmit={onSubmit} setJobDetails={setJobDetails} jobDetails={jobDetails} isEdit={false}/>
  
      </div>

      </div>
  )
}

export default Page