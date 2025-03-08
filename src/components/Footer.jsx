import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="max-w-[65rem] mx-auto flex flex-col-reverse md:flex-row gap-[2rem] md:justify-between items-start p-[2rem] text-[14px] md:text-[16px]">
        <img
          src="/images/logo.svg"
          alt="Get Jobs Today Logo"
          className="w-[100px] md:self-end"
        ></img>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">Find Jobs</h3>
          <Link target="_blank" href="/about-us" className="text-[12px]">About Us</Link>
          <Link target="_blank" href="/privacy-policy" className="text-[12px]">Privacy Policy</Link>
          <Link target="_blank" href="/contact" className="text-[12px]">Contact Us</Link>
        </div>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">Job Categories</h3>
          <h5 className="text-[12px]">Remote Jobs</h5>
          <h5 className="text-[12px]">Tech Jobs</h5>
          <h5 className="text-[12px]">High-Paying Jobs</h5>
        </div>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">For Employers</h3>
          <h5 className="text-[12px]">Post a Job</h5>
          <Link target="_blank" href="/pricing" className="text-[12px]">Pricing</Link>
          <Link target="_blank" href="/terms-of-service" className="text-[12px]">Terms of Service</Link>
        </div>
      </div>
  )
}
