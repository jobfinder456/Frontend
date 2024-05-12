"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoChevronDownOutline } from "react-icons/io5";

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

            <div className='flex items-center justify-center gap-[0.5rem] button-secondary'>

            <h3 className=''>For Employers</h3>

            <IoChevronDownOutline />

            </div>
        
            

            <div className={`absolute top-[3rem] md:top-[4rem] ${visible ? '' : 'hidden'} w-[100%] bg-background flex flex-col items-start-start gap-[0.5rem] text-base-1 p-[1rem] md:p-[12px] rounded-[12px] border-[1px] border-background font-medium`}>

            <Link href={'/dashboard'} className="z-50">Dashboard</Link>
            <Link href={'/dashboard'} className="z-50">Contact Us</Link>
            <Link href={'/signin'} className="z-50">Signin</Link>
            <button onClick={onSignout} className="bg-accent-red-2 text-start text-accent-red-1 rounded-[8px] z-50">Signout</button>

            </div>
            

        </div>

    </>
  )
}

export default ForEmp