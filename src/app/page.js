import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Marquee from "@/components/Marquee";
import EmailCollector from "@/components/EmailCollector";

export default function Home() {
  const latestPosts = [
    {
      id: 56,
      job_title: "SDE",
      company_name: "Stripe",
      remote: true,
      loc: "Bangalore",
      logo_url: "",
    },
    {
      id: 58,
      job_title: "SDE-II",
      company_name: "Stripe",
      remote: false,
      work_loc: "Bangalore",
      logo_url: "",
    },
    {
      id: 58,
      job_title: "SDE-II",
      company_name: "Stripe",
      remote: false,
      work_loc: "Bangalore",
      logo_url: "",
    },
  ];

  return (
    <div className="max-w-[73.75rem] mx-auto flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden mb-[2rem]">
      <Navbar />

      <div className="w-[100%] text-center flex flex-col items-center justify-center gap-[1rem] p-[1rem] mt-[1rem]">
        <h1 className="text-[2.5rem] md:text-[4rem] font-light leading-tight">
          <span className="font-medium">Get</span> your dream{" "}
          <span className="font-medium">job today</span>
        </h1>

        <h3 className="md:px-[4rem] text-[14px] md:text-[20px] ">
          Boost your career growth, by joining one of the the latest growing
          company, browse through our immense library of jobs of the growing
          startups.
        </h3>

        <div
          className=" browse-button ease-in-out flex items-center justify-center gap-[0.5rem] md:gap-[1rem] mt-[1rem] text-[16px] md:text-[20px] p-[8px] md:p-[16px] button-primary bg-accent-blue-1 border-accent-blue-1 active:w-[80%] focus:w-[80%]"
          style={{
            transition: "width 2s ease",
          }}
        >
          <Link href={"/search"} className="w-[100%]">
            Browse Jobs Now{" "}
          </Link>

          <BsArrowRight size={32} />
        </div>
        <p className="text-base-2 text-[12px] md:text-[14px]">No Login required</p>
      </div>

      <Marquee></Marquee>

      <div className="w-[100%] max-w-[73.75rem] px-[0.5rem] md:px-[2rem] mx-auto flex flex-col items-start justify-start gap-[1rem] p-[1rem]">
        <h2 className="text-[20px] md:text-[20px] font-medium">Latest Jobs</h2>

        <div className="w-[100%] flex flex-col justify-center items-center gap-[0.5rem]">
          {latestPosts.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              jobTitle={job.job_title}
              companyName={job.company_name}
              isRemote={job.remote}
              loc={job.work_loc}
            />
          ))}
        </div>
      </div>

      <div className="w-[100%] p-[1rem] md:p-[2rem]">
        <div className=" bg-base-1 flex flex-col p-[1rem] md:p-[2rem] rounded-[1rem] gap-[1rem]">
        <h1 className="text-white text-[1.5rem] md:text-[2rem] font-medium">Hey Job Seekers</h1>

        <h5 className="text-white text-[14px] md:text-[1.2rem] leading-[1.2rem] w-[100%] md:w-[40%] mb-[2rem]">
          drop your mail below to know latest job opening you looking for.
        </h5>

        <EmailCollector isHome={false}></EmailCollector>
        </div>
      </div>

      <div className="w-[100%] flex flex-col-reverse md:flex-row gap-[2rem] md:justify-between items-start p-[2rem] text-[14px] md:text-[16px]">

        <img src="/images/logo.svg" className="w-[100px] md:self-end"></img>

        <div className="flex flex-col text-[1rem] gap-[0.5rem] md:gap-[1rem]">

          <h3 className="text-[18px] font-medium">Get Jobs Today</h3>

          <h5>About Us</h5>

          <h5>Privacy Policy</h5>

          <h5>Contact Us</h5>

        </div>

        <div className="flex flex-col text-[1rem] gap-[0.5rem] md:gap-[1rem]">

          <h3 className="text-[18px] font-medium">For Job Seekers</h3>

          <h5>How it Works</h5>

          <h5>Blogs</h5>

        </div>

        <div className="flex flex-col text-[1rem] gap-[0.5rem] md:gap-[1rem]">

          <h3 className="text-[18px] font-medium">For Companies</h3>

          <h5>How it Works</h5>

          <h5>Pricing</h5>

          <h5>Terms of service</h5>

          <h5>Cancellation & Refund</h5>

          <h5>Help</h5>

        </div>

      </div>

    </div>
  );
}
