"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(true);

  const onEmailSubmit = async () => {
    try {
      toast("🟢 OTP send succesfully");
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/signup`, {
        email: email,
        password: password,
      });
      setDisable(false);
    } catch (error) {
      console.error("Email sending error:", error);
    }
  };

  const onOtpSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/check`,
        { email: email, otp: otp }
      );
      localStorage.setItem("jf_token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Email sending error:", error);
    }
  };

  return (
    <div className="w-[100%] p-[1rem]">
      <Navbar />

      <Toaster />

      <div className="relative mx-auto mt-[2rem] max-w-[32rem] p-[1rem] md:p-[2rem] text-black flex flex-col justify-center items-start gap-4 rounded-[16px] shadow-[0px_0px_16px_4px_rgba(0,0,0,0.1)]">
        <h1 className="text-[1.2rem] md:text-[1.5rem] font-medium">
          Signup to your account with OTP to post Job, Superfast!!
        </h1>

        <div className="w-[100%] flex flex-col items-start justify-start gap-[0.25rem]">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-inp disabled:opacity-20"
            type="email"
            id="email"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={!disable}
          />

          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input
            className="form-inp disabled:opacity-20"
            type="text"
            id="password"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Email"
            disabled={!disable}
          />
        </div>

        {!disable && (
          <div className="w-[100%] flex flex-col items-start justify-start gap-[0.25rem]">
            <label htmlFor="OTP" className=" form-label">
              OTP
            </label>
            <input
              className="form-inp disabled:opacity-20"
              type="text"
              id="OTP"
              onChange={(e) => setOtp(e.target.value)}
              placeholder=""
              disabled={disable}
            />
          </div>
        )}

        {disable && (
          <button
            onClick={onEmailSubmit}
            className="w-[100%] button-primary disabled:opacity-20"
            disabled={!disable}
          >
            Send OTP
          </button>
        )}

        {!disable && (
          <button
            onClick={onOtpSubmit}
            className={`w-[100%] button-primary disabled:opacity-20`}
            disabled={disable}
          >
            Submit
          </button>
        )}

        <Link href={"/login"}>Already been here ? Login</Link>
      </div>
    </div>
  );
};

export default Signup;
