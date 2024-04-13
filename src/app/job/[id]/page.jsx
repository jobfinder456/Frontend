"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'

function page() {

    const [details, setDetails] = useState({})
  useEffect( () => {
    async function get () {
      try {
        const id = window.location.href.split("/")[4]
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/job/${id}`)
        setDetails(response.data.result.rows[0])
        console.log(response.data.result.rows[0])
      } catch (error) {
        console.log(error)
      }
    }

    get()
      
  }, [])

  return (
    <div className='relative w-full mx-auto flex flex-col justify-between '>

        <Navbar />

        <div className='relative max-w-[42rem] mx-auto flex flex-col md:flex-row justify-between py-[2rem] gap-[2rem] md:gap-[0rem] px-[1rem] sm:px-[2rem]'>

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
                   <p className='mt-[1rem]'>{details.description}</p>
             </div>
                              
             <div className='w-[100%] md:w-[28%] flex flex-col gap-[1rem]'>

                   <a href={details.job_link} className='bg-blue-700 px-[1rem] py-[0.5rem] text-white rounded-md'>Apply for this job</a>

                   <div className='bg-zinc-200 p-[0.5rem] rounded-md flex flex-col gap-[1rem]'>

                         <label htmlFor='email' className='text-[0.85rem] font-medium'> Want to apply interview first ? Drop your mail, we will send the notification as soon as new Job post drops</label>
                         <input type="text" placeholder='your mail' id='email' autoComplete='off'
                                 className='w-[100%] border-[2px] rounded-md px-[1rem] py-[0.25rem] border-zinc-600' 
                         />

                   </div>
             </div>

        </div>



  </div>
  )
}

export default page