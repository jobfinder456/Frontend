"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

function ForEmp() {

    const [visible, setVisible] = useState(false);

    const onSignout = () => {
        localStorage.removeItem('jf_token');
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (visible && !event.target.closest('.for-emp-container')) {
                setVisible(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [visible]);

  return (
    <>
        <div onClick={toggleVisibility} className="for-emp-container relative">
        
            <h3 className='text-base-1 p-[1rem] md:p-[12px] rounded-[12px] border-[1px] border-base-1 font-medium'>For Employers </h3>

            <div className={`absolute top-[3rem] md:top-[4rem] ${visible ? '' : 'hidden'} w-[100%] bg-background flex flex-col items-start-start gap-[0.5rem] text-base-1 p-[1rem] md:p-[12px] rounded-[12px] border-[1px] border-background font-medium`}>

            <Link href={'/dashboard'} className="">Dashboard</Link>
            <Link href={'/dashboard'} className="">Contact Us</Link>
            <Link href={'/signin'} className="">Signin</Link>
            <button onClick={onSignout} className="bg-accent-red-2 text-start text-accent-red-1 rounded-[8px]">Signout</button>

            </div>
            

        </div>

    </>
  )
}

export default ForEmp