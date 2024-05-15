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
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/verify-otpp`, {email: email, otp: otp});
          console.log("send success", response.data.token)
          localStorage.setItem('jf_token', response.data.token);
          router.push('/dashboard');
        } catch (error) {
          console.error('Email sending error:', error);
        }
      };

  return (
    <div className='w-[100%] p-[1rem]'>

        <Navbar />

    <Toaster />

    <div className="relative mx-auto mt-[2rem] max-w-[32rem] p-[1rem] md:p-[2rem] text-black flex flex-col justify-center items-start gap-4 rounded-[16px] shadow-[0px_0px_16px_4px_rgba(0,0,0,0.1)]">

            <h1 className='text-[1.2rem] md:text-[1.5rem] font-medium'>Login to your account with OTP to post Job, Supafast!!</h1>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='email' className='form-label'>Email</label>
              <input
                        className='form-inp disabled:opacity-20'
                        type="email"
                        id="email"
                        autoComplete="on"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        disabled={!disable}
                    />

            </div>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='OTP' className=' form-label'>OTP</label>
              <input
                        className='form-inp disabled:opacity-20'
                        type="text"
                        id="OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder=""
                        disabled={disable}
                    />

            </div>
            
            <button onClick={onEmailSubmit} className='w-[100%] button-primary disabled:opacity-20' disabled={!disable}>Send OTP</button>

            <button onClick={onOtpSubmit} className={`w-[100%] button-primary disabled:opacity-20`} disabled={disable}>Submit</button>

        </div>

        </div>
  )
}

export default Page