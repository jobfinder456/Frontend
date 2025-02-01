"use client";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuthContext } from "@/app/provider";

export default function ProfilePage() {
  const { user, loading } = useAuthContext();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[100%] bg-background p-[1rem] rounded-[1rem]">
      <div className="flex flex-col items-start justify-start gap-[1rem] rounded-[14px] bg-white p-[1rem]">
        <h1 className="text-lg font-semibold text-center text-gray-600 mb-4">
          Profile Details
        </h1>
        {user ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <input
                className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                type="text"
                value={user.name || "N/A"}
                disabled
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                  type="text"
                  value={user.email}
                  disabled
                />
                <button
                  onClick={() => handleCopy(user.email)}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Plan Name */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Plan Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                type="text"
                value={
                  user.sub_id == "sub_PqPELcpaciyosf"
                    ? "Growth - $449"
                    : "Starter - $199"
                }
                disabled
              />
            </div>

            {/* Forgot Password Link */}
            <div className="md:col-span-2">
              <Link
                href="/forgot-password"
                className="text-sm text-accent-blue-1 underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No profile data available.
          </p>
        )}
      </div>
    </div>
  );
}
