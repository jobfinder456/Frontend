"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import toast, { Toaster } from 'react-hot-toast';
import NotFound from '@/components/NotFound';

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
    return <NotFound></NotFound>;
  }

  return (
    <div className='relative max-w-[73.75rem] mx-auto flex flex-col justify-between mb-[2rem]'>

        <Navbar />

        <Toaster />

        <div className='relative w-[100%] mx-auto flex flex-col justify-center gap-[2rem] md:gap-[0rem] px-[1rem] text-[14px] md:text-[1rem] lg:text-[20px]'>

             <div className='w-[100%] flex flex-col items-center justify-center gap-[1rem] mt-[1rem]'>

                   <a href={details.website} className='w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-zinc-400 rounded-md'>
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

                   <h3 className='text-[1rem] md:text-[20px] font-medium text-base-2'>{details.company_name}</h3>
                   <h1 className='text-[28px] md:text-[40px] font-bold text-base-1 mb-[1rem] md:mb-[3rem] text-center'>{details.job_title}</h1>

                   
             </div>

             <div className='relative flex flex-col md:flex-row justify-center items-start gap-[20px]'>

                  <div className='flex-grow w-[100%] bg-background rounded-[20px] flex flex-col gap-[40px] items-start justify-start p-[20px]'> {/* desc bg one */}

                    <div className='flex justify-start items-center gap-[20px]'>

                      <div className='bg-[#DBDBDB] p-[12px] rounded-[8px]'>
                        {details.work_loc} {details.remote ? "Remote" : null}
                      </div>
                      
                      <div className='bg-[#DBDBDB] p-[12px] rounded-[8px]'>{details.commitment}</div>

                    </div>

                    <div className=''>{details.description && (
                     <p className='' dangerouslySetInnerHTML={{ __html: details.description }} />
                    )}
                    </div>

                  </div>


                  <div className='top-[20px] sticky w-[100%] md:w-[40%] flex flex-col gap-[20px]'>

                   <a href={`${details.job_link}/utm_source=getjobs.today&utm_medium=organic`} className='bg-accent-blue-2 p-[1rem] text-white rounded-[16px] flex items-center '>
                      <h3 className='bg-accent-blue-1 text-center w-[100%] p-[1rem] rounded-[12px] font-medium'>Apply for this job</h3>
                   </a>

                   <div className='bg-background p-[1rem] rounded-[16px] flex flex-col gap-[1rem]'>

                         <label htmlFor='email' className=' font-medium text-base-1 mb-[1rem]'> Be the first one to apply any job. We will send you similar job post Supafast!</label>
                         <input type="text" placeholder='your mail' id='email' autoComplete='off'
                                 className='w-[100%] border border-base-1 p-[0.8rem] rounded-[12px]' 
                                 onChange={e => {setEmail(e.target.value)}}
                         />
                         <button className='bg-base-1 text-white font-medium rounded-[8px] py-[1rem]' onClick={submitMail}>Submit</button>

                   </div>

                  </div>

             </div>
                              
             

        </div>



  </div>
  )
}

export default Page