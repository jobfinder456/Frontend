"use client";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function page() {
  const [load, setLoad] = useState(false);

  const fetchSubscription = async () => {
    try {
      setLoad(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/get-subscription`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <div className="w-[100%] bg-background p-[1rem] rounded-[1rem]">
      <div className="flex flex-wrap justify-evenly items-center gap-[2rem] rounded-[14px] bg-white p-[1rem]">
        <h1 className="text-[1rem] w-[100%] text-center font-medium mt-[0.5rem] md:mt-[1rem] leading-[1.2rem]">
          Subscription
        </h1>
      </div>
    </div>
  );
}
