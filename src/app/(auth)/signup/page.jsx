"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OtpInput from "@/components/OTP-Input";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling buttons
  const [otpEnabled, setOtpEnabled] = useState(false); // To control OTP visibility

  const onEmailSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      toast.success("OTP sent successfully!");
      setOtpEnabled(true);
    } catch (error) {
      console.log(error);
      error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to send OTP.";
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOtpSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/auth/check`,
        {
          email: email,
          otp: otp,
        },
        { withCredentials: true }
      );
      localStorage.setItem("isLogin", new Date().toISOString());
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[48rem] mx-auto min-h-screen px-[1rem] pb-[1rem]">
      <div className="bg-background max-w-[32rem] mx-auto rounded-[1rem] p-[0.75rem] md:p-[1rem] mt-[2rem]">
        <div className="relative bg-white p-[1rem] md:p-[2rem] text-black flex flex-col justify-center items-start gap-4 rounded-[14px]">
          <h1 className="text-[1.2rem] md:text-[1.5rem] font-medium">
            Signup to your account with OTP to post jobs, super fast!
          </h1>

          {/* Email and Password Fields */}
          <div
            className={`w-[100%] flex flex-col items-start justify-start gap-[0.25rem] ${
              otpEnabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-inp"
              type="text"
              id="name"
              autoComplete="on"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              disabled={otpEnabled || isSubmitting}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-inp"
              type="email"
              id="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={otpEnabled || isSubmitting}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-inp"
              type="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={otpEnabled || isSubmitting}
            />
          </div>

          {/* OTP Input */}
          {otpEnabled && (
            <div className="w-[100%] flex flex-col items-start justify-start gap-[0.25rem]">
              <hr />
              <label htmlFor="OTP" className="form-label">
                OTP
              </label>
              <OtpInput
                length={6}
                onComplete={(value) => setOtp(value)} // Update OTP state
              />
            </div>
          )}

          {/* Submit Buttons */}
          {!otpEnabled && (
            <button
              onClick={onEmailSubmit}
              className="w-[100%] button-primary disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send OTP"}
            </button>
          )}

          {otpEnabled && (
            <button
              onClick={onOtpSubmit}
              className="w-[100%] button-primary disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          )}

          {/* Links */}
          <div className="w-[100%] flex items-center justify-between gap-[0.5rem] text-xs underline underline-offset-2">
            <Link href={"/login"}>Already been here? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
