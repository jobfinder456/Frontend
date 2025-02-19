import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import EmailCollector from "@/components/EmailCollector";
import LatestJobs from "@/components/LatestJobs";
import Button from "@/components/Button";
import BookmarkAlert from "@/components/BookmarkAlert";

export default function Home() {
  return (
    <div className="relative max-w-[73.75rem] mx-auto flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden mb-[2rem] px-[1rem]">
      <BookmarkAlert />
      <div className="z-10 w-[100%] text-center flex flex-col items-center justify-center gap-[1rem] mt-[1rem]">
        <h1 className="text-[2.5rem] md:text-[4rem] font-light leading-tight">
          <span className="font-medium">Find</span> the Best <span className="font-medium">Job Vacancies</span> Today
        </h1>

        <h3 className="sm:px-[4rem] text-sm md:text-[20px] sm:leading-[1.2rem] md:leading-[2rem]">
          Browse the latest <strong>remote jobs, startup jobs, IT jobs, and high-paying opportunities</strong> from top companies. Get hired faster!
        </h3>

        <Button title="Explore Job Openings Now"></Button>
        <p className="text-base-2 text-[12px] md:text-[14px]">No Login Required – Apply Instantly</p>
      </div>

      <Marquee></Marquee>

      <div className="w-[100%] max-w-[73.75rem] md:px-[2rem] mx-auto flex flex-col items-start justify-start gap-[1rem]">
        <LatestJobs></LatestJobs>
      </div>

      <div className="w-[100%] p-[1rem] md:p-[2rem]">
        <div className="relative overflow-hidden bg-background flex flex-col p-[1rem] md:p-[2rem] rounded-[1rem] gap-[0.35rem] md:gap-[1rem] text-base-1">
          <h1 className=" text-[1.1rem] md:text-[2rem] font-medium">
            Stay Updated on Top Hiring Trends
          </h1>

          <h5 className=" text-[12px] md:text-[1.2rem] leading-[1.2rem] w-[100%] md:w-[40%] mb-[2rem]">
            Subscribe to get the latest updates on <strong>remote work, tech jobs, and high-paying job vacancies</strong>.
          </h5>

          <img
            src="/images/resume.png"
            alt="Resume for Job Applications"
            className="absolute hidden sm:block w-[15rem] md:w-[22rem] top-4 md:top-12 right-4 saturate-100  rotate-[15deg]"
          />

          <EmailCollector isHome={false}></EmailCollector>
        </div>
      </div>

      <div className="w-[100%] flex flex-col-reverse md:flex-row gap-[2rem] md:justify-between items-start p-[2rem] text-[14px] md:text-[16px]">
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
    </div>
  );
}
