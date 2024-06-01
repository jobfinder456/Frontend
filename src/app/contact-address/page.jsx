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
            Office Address{" - "}
            <span className="font-medium">
              P2 Belegata Road, Near Sales Tax Office, Kolkata - 700015, West
              Bengal
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
