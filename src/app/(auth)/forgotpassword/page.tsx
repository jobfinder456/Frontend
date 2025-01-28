"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onEmailSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/forgetpass`, {
        email,
      });
      toast.success("OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOtpSubmit = async () => {
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/resetpass`,
        { email, otp, newPassword: password }
      );
      localStorage.setItem("jf_token", response.data.token);
      toast.success("Password reset successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[48rem] mx-auto min-h-screen px-[1rem] pb-[1rem]">
      <div className="bg-background max-w-[32rem] mx-auto rounded-[1rem] p-[0.75rem] md:p-[1rem] mt-[2rem]">
        <div className="relative bg-white p-[1rem] md:p-[2rem] text-black flex flex-col justify-center items-start gap-4 rounded-[14px]">
          <h1 className="text-[1.2rem] md:text-[1.5rem] font-medium">
            Reset your password with OTP!
          </h1>

          {/* Email Input */}
          <div
            className={`w-[100%] flex flex-col items-start justify-start gap-[0.25rem] ${
              otpSent ? "opacity-50 pointer-events-none" : ""
            }`}
          >
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
              placeholder="Enter your email"
              disabled={otpSent || isSubmitting}
            />
          </div>

          {/* Password and OTP Fields */}
          {otpSent && (
            <div className="w-[100%] flex flex-col items-start justify-start gap-[0.25rem]">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                className="form-inp"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={isSubmitting}
              />

              <label htmlFor="confirmPass" className="form-label">
                Confirm Password
              </label>
              <input
                className="form-inp"
                type="password"
                id="confirmPass"
                autoComplete="off"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
                disabled={isSubmitting}
              />

              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                className="form-inp"
                type="text"
                id="otp"
                autoComplete="off"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Action Buttons */}
          {!otpSent && (
            <button
              onClick={onEmailSubmit}
              className="w-[100%] button-primary disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {otpSent && (
            <button
              onClick={onOtpSubmit}
              className="w-[100%] button-primary disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>
          )}

          {/* Navigation Links */}
          <div className="w-[100%] flex items-center justify-between gap-[0.5rem] text-xs underline underline-offset-2">
            <Link href={"/signup"}>New here? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
