"use client"
import React, { useState } from 'react'
import Link from 'next/link'

function ForEmp() {

    const [visible, setVisible] = useState(false);

    const onSignout = () => {
        localStorage.removeItem('jf_token');
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

  return (
    <>
        <div onClick={toggleVisibility} className="relative px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem] bg-white">
        
            <h3>For Employers </h3>

            <div className={`absolute top-[3rem] md:top-[4rem] ${visible ? '' : 'hidden'} flex flex-col gap-[0.5rem]`}>

            <Link href={'/dashboard'} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem] bg-white">Dashboard</Link>
            <Link href={'/dashboard'} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem] bg-white">Contact Us</Link>
            <Link href={'/signin'} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem] bg-white">Signin</Link>
            <button onClick={onSignout} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem] bg-white">Signout</button>

            </div>
            

        </div>

    </>
  )
}

export default ForEmp