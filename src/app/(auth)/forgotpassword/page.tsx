"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const onEmailSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/forgetpass`, {
        email: email,
      });
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error("Failed to send OTP");
    }
  };

  const onOtpSubmit = async () => {
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_AUTH}/api/v1/resetpass`,
        { email, otp, newPassword: password }
      );
      localStorage.setItem("jf_token", response.data.token);
      toast.success("Password reset successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="w-full p-4">
      <Navbar />
      <Toaster />
      <div className="relative mx-auto mt-8 max-w-md p-6 text-black flex flex-col justify-center items-start gap-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium mb-4">Reset your password</h1>

        <div className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  id="confirmPass"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  id="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
            </>
          )}

          <button
            onClick={otpSent ? onOtpSubmit : onEmailSubmit}
            className="w-[100%] button-primary"
          >
            {otpSent ? "Reset Password" : "Send OTP"}
          </button>
        </div>

        <Link href="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
          New here? Sign up
        </Link>
      </div>
    </div>
  );
};
// this is for testing the github
export default ForgotPassword;
