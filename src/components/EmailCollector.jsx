"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

function EmailCollector({isHome}) {

    const [email, setEmail] = useState('')

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

  return (

    <>
    
    <Toaster />
 

    <div className={`${ isHome ? `bg-background p-[1rem]` : ''} rounded-[16px] flex flex-wrap gap-[1rem]`}>
      {isHome && <label htmlFor="email" className=" font-medium text-base-1 mb-[1rem]">
        Be the first one to apply any job. We will send you similar job post
        Supafast!
      </label> }
      <input
        type="text"
        placeholder="your mail"
        id="email"
        autoComplete="off"
        className="flex-grow max-w-[25rem] border border-base-1 p-[0.5rem] md:p-[0.8rem] rounded-[8px] md:rounded-[12px]"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        className={`flex-grow max-w-[19rem] ${isHome ? 'bg-base-1' : 'bg-accent-blue-1'}  text-white font-medium rounded-[8px] md:rounded-[12px] py-[0.5rem] md:py-[1rem]`}
        onClick={submitMail}
      >
        Submit
      </button>
    </div>

    </>
  );
}

export default EmailCollector;
