import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import EmailCollector from "@/components/EmailCollector";
import LatestJobs from "@/components/LatestJobs";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="max-w-[73.75rem] mx-auto flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden mb-[2rem] px-[1rem]">
      
      <Navbar />

      <div className="z-50 w-[100%] text-center flex flex-col items-center justify-center gap-[1rem] mt-[1rem]">
        <h1 className="text-[2.5rem] md:text-[4rem] font-light leading-tight">
          <span className="font-medium">Get</span> your dream{" "}
          <span className="font-medium">job today</span>
        </h1>

        <h3 className="md:px-[4rem] text-sm md:text-[20px] ">
          Boost your career growth, by joining one of the the latest growing
          company, browse through our immense library of jobs of the growing
          startups.
        </h3>

        <Button title="Browse Jobs Now"></Button>
        <p className="text-base-2 text-[12px] md:text-[14px]">
          No Login required
        </p>
      </div>

      <Marquee></Marquee>

      <div className="w-[100%] max-w-[73.75rem] md:px-[2rem] mx-auto flex flex-col items-start justify-start gap-[1rem]">
        <h2 className="text-[16px] md:text-[20px] font-medium pl-[1rem]">Latest Jobs</h2>

        <LatestJobs></LatestJobs>
        
      </div>

      <div className="w-[100%] p-[1rem] md:p-[2rem]">
        <div className=" bg-background flex flex-col p-[1rem] md:p-[2rem] rounded-[1rem] gap-[0.35rem] md:gap-[1rem] text-base-1">
          <h1 className=" text-[1.1rem] md:text-[2rem] font-medium">
            Hey Job Seekers
          </h1>

          <h5 className=" text-[12px] md:text-[1.2rem] leading-[1.2rem] w-[100%] md:w-[40%] mb-[2rem]">
            drop your mail below to know latest job opening you looking for.
          </h5>

          <EmailCollector isHome={false}></EmailCollector>
        </div>
      </div>

      <div className="w-[100%] flex flex-col-reverse md:flex-row gap-[2rem] md:justify-between items-start p-[2rem] text-[14px] md:text-[16px]">
        <img src="/images/logo.svg" className="w-[100px] md:self-end"></img>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">Get Jobs Today</h3>

          <Link target="_blank" href={"/about-us"} className="text-[12px]">
            About Us
          </Link>

          <Link
            target="_blank"
            href={"/privacy-policy"}
            className="text-[12px]"
          >
            Privacy Policy
          </Link>

          <Link target="_blank" href={"/contact"} className="text-[12px]">
            Contact Us
          </Link>

          <Link
            target="_blank"
            href={"https://x.com/GetjobsT21103"}
            className="text-[12px]"
          >
            X (Twitter)
          </Link>

          <Link
            target="_blank"
            href={"https://www.linkedin.com/company/get-jobs-today/"}
            className="text-[12px]"
          >
            LinkedIn
          </Link>
        </div>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">For Job Seekers</h3>

          <h5 className="text-[12px]">How it Works</h5>

          <h5 className="text-[12px]">Blogs</h5>
        </div>

        <div className="flex flex-col text-[1rem] gap-[0.35rem] md:gap-[1rem]">
          <h3 className="text-[14px] font-medium">For Companies</h3>

          <h5 className="text-[12px]">How it Works</h5>

          <Link target="_blank" href={"/pricing"} className="text-[12px]">
            Pricing
          </Link>

          <Link
            target="_blank"
            href={"/terms-of-service"}
            className="text-[12px]"
          >
            Terms of service
          </Link>

          <Link href={"/cancellation-refund-policy"} className="text-[12px]">
            Cancellation & Refund
          </Link>

          <Link target="_blank" href={"/contact"} className="text-[12px]">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
