"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Button = ({ title }) => {
  const animationVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, 5, -1, 5, 0],
      transition: {
        duration: 0.9,
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-accent-blue-2 p-[0.45rem] md:p-[0.5rem] rounded-[14px]">
      <Link
        href="/search"
        className="whitespace-nowrap flex gap-[0.75rem] items-center md:gap-[1rem] bg-accent-blue-1 text-white text-[14px] md:text-[1rem] font-medium px-[0.85rem] py-[0.65rem] md:px-[1rem] md:py-[0.75rem] rounded-[10px]"
      >
        <span>{title}</span>
        <motion.div
          variants={animationVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <BsArrowRight size={20} />
        </motion.div>
      </Link>
    </div>
  );
};

export default Button;