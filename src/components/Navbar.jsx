import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="w-[100%] p-[0.5rem] md:px-[2rem] flex justify-between items-center py-[1rem]">

        <Link href={'/'} className="w-[2rem] h-[2rem] bg-blue-700">

        </Link>

        <div className="flex justify-center items-center text-[0.95rem] md:text-[1.2rem] gap-[0.5rem] md:gap-[1rem]">

          <Link href={'/dashboard'} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] border border-blue-700 rounded-[2rem]">For Employers</Link>

          <Link href={'/postjob'} className="px-[1rem] md:px-[1.5rem] py-[0.5rem] md:py-[0.75rem] bg-blue-700 rounded-[2rem] text-white font-semibold">Post a Job</Link>

        </div>

      </div>
  )
}

export default Navbar