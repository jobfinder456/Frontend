"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoChevronDownOutline } from "react-icons/io5";

function ForEmp() {
  const [visible, setVisible] = useState(false);

  const onSignout = () => {
    localStorage.removeItem("getjobs");
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (visible && !event.target.closest(".for-emp-container")) {
        setVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [visible]);

  return (
    <>
      <div onClick={toggleVisibility} className="for-emp-container relative">
        <div className="flex items-center justify-center gap-[0.5rem] button-secondary">
          <h3 className="cursor-pointer">For Employers</h3>

          <IoChevronDownOutline />
        </div>

        <div
          className={`absolute z-[99] top-[3rem] md:top-[4rem] ${
            visible ? "" : "hidden"
          } w-[100%] bg-white flex flex-col items-start-start gap-[0.5rem] text-base-1 p-[1rem] md:p-[12px] rounded-[12px] border-[1px] border-background font-medium shadow-[0px_0px_16px_4px_rgba(0,0,0,0.1)]`}
        >
          <Link href={"/dashboard"} className="z-50 pl-[0.2rem]">
            Dashboard
          </Link>
          <Link href={"/contact"} className="z-50 pl-[0.2rem]">
            Contact Us
          </Link>

          <Link
            href={"/login"}
            className="bg-accent-blue-2 z-50 pl-[0.2rem] text-accent-blue-1 rounded-[4px]"
          >
            Signin
          </Link>

          <button
            onClick={onSignout}
            className="bg-accent-red-2 text-start text-accent-red-1 rounded-[4px] z-50 pl-[0.4rem]"
          >
            Signout
          </button>
        </div>
      </div>
    </>
  );
}

export default ForEmp;
