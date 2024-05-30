import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto">
      <Navbar></Navbar>

      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[1rem] my-[2rem] ">
          <p className="text-[1.2rem]">
            For any queries, feel free to reach out to us at{" "}
            <a
              href="mailto:hq@getjobs.today"
              className="text-base-2 underline font-medium"
            >
              hq@getjobs.today
            </a>
            . We usually respond within 12 hours.
          </p>

          <Link
            href={"mailto:hq@getjobs.today"}
            className="button-primary text-center mt-[2rem]"
          >
            Shoot us your query
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
