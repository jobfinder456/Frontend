import React from 'react'
import Link from 'next/link'
import ForEmp from './ForEmp'

function Navbar() {

  return (
    <div className="w-[100%] py-[1rem] md:px-[2rem] flex justify-between items-center">

        <Link href={'/'} className="w-[2.5rem] h-[2.5rem] flex items-center justify-center">
          <img src='/images/logo.svg' />
        </Link>

        <div className="flex justify-center items-center text-[0.95rem] md:text-[16px] gap-[0.5rem] md:gap-[1rem]">

          <ForEmp />

          <Link href={'/postjob'} className="text-white bg-base-1 p-[1rem] md:p-[12px] rounded-[12px] border-[1px] border-base-1 font-medium">Post a Job</Link>

        </div>

      </div>
  )
}

export default Navbar