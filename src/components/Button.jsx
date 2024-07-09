"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Button = ({ title }) => {
  const [width, setWidth] = useState(false);

  return (
    <motion.div
      initial={{ minWidth: "256px" }}
      animate={{ width: width ? "80%" : "" }}
      transition={{
        ease: "linear",
        duration: 3,
      }}
      onClick={() => setWidth(true)}
      className={`  flex-grow-0 ease-in-out flex items-center justify-center mt-[1rem] text-[16px] md:text-[20px] p-[8px] md:p-[20px] button-primary bg-accent-blue-1 border-accent-blue-1`}
    >
      <Link
        href={"/search"}
        className="whitespace-nowrap flex gap-[0.5rem] md:gap-[1rem]"
      >
        <span>
          {" "}
          {title}
        </span>
        <BsArrowRight size={24} />
      </Link>
    </motion.div>
  );
};

export default Button;
