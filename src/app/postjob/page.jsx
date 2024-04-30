"use client"
import React, {useState} from 'react'
import axios from 'axios'
import Form from '@/components/Form'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

function page() { 
  
    const router = useRouter();
    const [modal, setModal] = useState(false)
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
  
  const onSubmit = async() => {
  
    const token = localStorage.getItem("jf_token") || false
    if(!token){
      setModal(true)
      return
    }
    
    const formData = new FormData();
      // Append all text fields to formData
      for (const key in jobDetails) {
          if (key !== "image") {
              formData.append(key, jobDetails[key]);
          }
      }
      // Append the file. Ensure 'image' matches your backend expectation
      if (jobDetails.image) {
          formData.append("image", jobDetails.image);
      }
  
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
  
      console.log(formData)
  
      try {
  
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/insert`, formData, {
            headers: {
                // Inform the server about the data type
                "Content-Type": "multipart/form-data",
            },
        })
          console.log(response)
          router.push('/dashboard')
      } catch (error) {
          console.log(error)
          if (error.response && error.response.status === 400) {
            toast(" Enter details properly")
        } else {
          setModal(true)
        }
          
      }
  }
  
  
    return (

      <div>

      <Navbar />

      <Toaster />

      <div className='relative max-w-[42rem] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] p-[1rem]'>
  
            { modal ? <div className='sticky top-[2rem] rounded-[8px] p-[1rem] bg-white w-[90%] h-[10rem] mx-auto'>
                        
                          <div>
                            New here ? <Link className='underline' href={'/signup'}>Signup</Link>
                          </div>
                          <div>
                            Already have an account ? <Link className='underline' href={'/signin'}>Login</Link>
                          </div>
            </div> : null }
          
              <h1 className='text-[1.5rem] md:text-[2rem] leading-[2rem] md:leading-[2.5rem]'><span className='underline decoration-blue-700'>Recruit top talent!</span> Broadcast your job post to thousands of eager job seekers.</h1>
  
              <Form onSubmit={onSubmit} setJobDetails={setJobDetails} jobDetails={jobDetails} isEdit={false}/>
  
      </div>

      </div>
  )
}

export default page