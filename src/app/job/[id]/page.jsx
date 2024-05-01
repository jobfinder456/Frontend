"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import toast, { Toaster } from 'react-hot-toast';

function Page() {
  
  const [email, setEmail] = useState('')
  const [notFound, setNotFound] = useState(false);
    const [details, setDetails] = useState({})
  useEffect( () => {
    async function get () {
      try {
        const id = window.location.href.split("/")[4]
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/job/${id}`)
        console.log(response.data.result[0])
        if (response.data.result.length === 0) {
          setNotFound(true);
      } else {
          setDetails(response.data.result[0]);
      }
        
      } catch (error) {
        console.log(error)
      }
    }

    get()
      
  }, [])

  async function submitMail () {
    if(!email) {
      toast('Enter email please')
      console.log("provide email")
      return
    }

    try {
      toast('🟢 Email submitted successfully')
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/insert-user-email`, {email: email})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  if (notFound) {
    return <div>404 - Job not found</div>;
  }

  return (
    <div className='relative w-full mx-auto flex flex-col justify-between '>

        <Navbar />

        <Toaster />

        <div className='relative max-w-[56rem] mx-auto flex flex-col md:flex-row justify-between py-[2rem] gap-[2rem] md:gap-[0rem] px-[1rem] sm:px-[2rem]'>

             <div className='w-[100%] md:w-[70%] flex flex-col items-start justify-center gap-[0.5rem] '>
                   <a href={details.website} className='w-[4rem] h-[4rem] bg-zinc-400 rounded-md'>
                             {details.logo_url ? (
                                    <img
                                      src={details.logo_url}
                                      alt="logo"
                                      className="w-full h-full object-cover"
                                      style={{ objectFit: 'cover' }} // You can set object-fit through inline styles
                                    />
                                  ) : (
                                    <span className="flex items-center justify-center h-full text-white">{details?.company_name}</span> // Adjusted the padding to center vertically
                                  )}
                   </a>
                   <h3 className='text-[1.5rem] text-zinc-500'>{details.company_name} is hiring for </h3>
                   <h1 className='text-[2rem] font-bold'>{details.job_title}</h1>
                   <h3 className='text-[1rem]'>{details.work_loc} <span className='text-[0.8rem] pl-[1rem]'>{details.remote ? "Remote" : null}</span></h3>
                   {details.description && (
            <p className='mt-[1rem]' dangerouslySetInnerHTML={{ __html: details.description }} />
          )}
             </div>
                              
             <div className='w-[100%] md:w-[28%] flex flex-col gap-[1rem]'>

                   <a href={details.job_link} className='bg-blue-700 px-[1rem] py-[0.5rem] text-white rounded-md'>Apply for this job</a>

                   <div className='bg-blue-200 p-[0.5rem] rounded-md flex flex-col gap-[1rem]'>

                         <label htmlFor='email' className='text-[0.85rem] font-medium text-zinc-700'> Want to apply interview first ? Drop your mail, we will send the notification as soon as new Job post drops</label>
                         <input type="text" placeholder='your mail' id='email' autoComplete='off'
                                 className='w-[100%] border-[2px] rounded-md px-[1rem] py-[0.25rem] border-zinc-400' 
                                 onChange={e => {setEmail(e.target.value)}}
                         />
                         <button className='bg-blue-100 text-blue-900 font-medium rounded-[8px] py-[0.5rem]' onClick={submitMail}>Submit</button>

                   </div>
             </div>

        </div>



  </div>
  )
}

export default Page