import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto">
      <Navbar></Navbar>

      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[1rem] my-[2rem] ">
          <section id="about-us">
            <h1 className="font-medium text-[1.1rem]">About Us</h1>
            <p>
              At GetJobs.Today, we are dedicated to linking the best and most
              extensive talent pool with dynamic companies and startups. Our
              mission is to facilitate business growth by simplifying the hiring
              process and providing access to exceptional candidates. Our
              platform is tailored to help job seekers find their ideal
              positions and employers discover top-tier talent across various
              sectors.
            </p>
          </section>

          <section id="find-job">
            <h2 className="font-medium text-[1.1rem]">Find Your Perfect Job</h2>
            <p>
              Browse a wide array of job listings in diverse fields such as
              Development, Design, Finance, Sales, and more. Whether you&apos;re
              kick-starting your career or seeking a significant change,
              GetJobs.Today offers numerous opportunities that align with your
              skills and goals.
            </p>
          </section>

          <section id="independent-spirit">
            <h2 className="font-medium text-[1.1rem]">
              Our Independent Spirit
            </h2>
            <p>
              We pride ourselves on being an independent, bootstrapped, and
              self-funded platform. Instead of relying on external funding, we
              operate a profitable business sustained by our users&apos; subscription
              fees. This independence allows us to grow at our own pace and make
              decisions that best serve our users.
            </p>
          </section>

          <section id="customer-centric">
            <h2 className="font-medium text-[1.1rem]">
              Customer-Centric Approach
            </h2>
            <p>
              Our growth is driven by our users, not investors. Being
              customer-funded means our users are always our top priority. We
              focus on providing outstanding customer support and ensuring user
              satisfaction above all else. Transparency is key to us, and we
              maintain a public roadmap and an active Slack channel to engage
              with our community.
            </p>
          </section>

          <section id="team-behind">
            <h2 className="font-medium text-[1.1rem]">The A-Team</h2>
            <Link
              href={"https://www.linkedin.com/in/nikhil-chopra788/"}
              className="underline font-medium block mt-[0.5rem]"
            >
              Nikhil Chopra
            </Link>
            <Link
              href={"https://www.linkedin.com/in/kmrsahil"}
              className="underline font-medium"
            >
              Sahil Kumar
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
