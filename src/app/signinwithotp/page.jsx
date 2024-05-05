"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

function Page() {

    const router = useRouter();
    const[email, setEmail] = useState('')
    const[otp, setOtp] = useState('')
    const[disable, setDisable] = useState(true)

    const onEmailSubmit = async () => {
        try {
            toast('🟢 OTP send succesfully')
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/sendemail`, {email: email});
          console.log(response)
          setDisable(false)
        } catch (error) {
          console.error('Email sending error:', error);
        }
      };

      const onOtpSubmit = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/verify-otpp`, {otp: otp});
          console.log("send success", response)
          router.push('/dashboard');
        } catch (error) {
          console.error('Email sending error:', error);
        }
      };

  return (
    <div className='w-[100%] p-[1rem]'>

        <Navbar />

    <Toaster />

    <div className="relative mx-auto mt-[2rem] max-w-[32rem] p-[1rem] md:p-[2rem] rounded-[10px] text-black flex flex-col justify-center items-start gap-4 shadow-md">

            <h1 className='text-[1.2rem] md:text-[1.5rem] font-medium'>Login to your account with OTP to post Job, Supafast!!</h1>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='email' className=' font-medium'>Email</label>
              <input
                  className={`w-[100%] p-[0.5rem] md:p-[1rem] border border-[#13131344] rounded-[4px] ${disable ? '' : 'opacity-50'}`}
                  type="email"
                  id="email"
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
              />

            </div>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='OTP' className=' font-medium'>OTP</label>
              <input
                  className={`w-[100%] p-[0.5rem] md:p-[1rem] border border-[#13131344] rounded-[4px] ${disable ? 'opacity-50' : ''}`}
                  type="text"
                id="OTP"
                onChange={(e) => setOtp(e.target.value)}
                placeholder=""
              />

            </div>
            
            <button onClick={onEmailSubmit} className={` w-[100%] text-center p-[0.5rem] rounded-[10px] bg-blue-700 text-white font-medium ${disable ? '' : 'opacity-25'}`}>Send OTP</button>

            <button onClick={onOtpSubmit} className={` w-[100%] text-center p-[0.5rem] rounded-[10px] bg-blue-700 text-white font-medium ${disable ? 'opacity-25' : ''} `}>Submit</button>

            <h3 className='text-[0.95rem] w-[100%] text-center'>New here ? <Link href={'/signup'} className='underline'>Create an account</Link></h3>

        </div>

        </div>
  )
}

export default Page