"use client";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/get-subscription`,
        { withCredentials: true }
      );
      setSubscription(response.data);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      if (!subscription.subscription_id) {
        toast.error("Subscription ID not found");
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/cancel-subscription`,
        { subscription_id: subscription.subscription_id },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/upgrade-subscription`,
        {
          subscription_id: subscription.subscription_id,
          new_plan_id: "plan_PpJsHEenU2Bkid",
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[100%] bg-background p-[1rem] rounded-[1rem]">
      <div className="flex flex-col items-start justify-start gap-[1rem] rounded-[14px] bg-white p-[1rem]">
        <h1 className="text-lg font-semibold text-center text-gray-600 mb-4">
          Subscription Details
        </h1>

        {subscription ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            {subscription.status == "cancel" ? (
              <div className="w-[100%] bg-background text-zinc-600 text-sm p-1 rounded-lg">
                {" "}
                Note : Your Subscriptions has been cancelled, you will be no
                longer charged, your credits will expire end of this month
              </div>
            ) : null}
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input
                className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                type="text"
                value={subscription.email}
                disabled
              />
            </div>

            {/* Subscription ID with Copy Button */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Subscription ID
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                  type="text"
                  value={subscription.subscription_id}
                  disabled
                />
                <button
                  onClick={() => handleCopy(subscription.subscription_id)}
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
                value={subscription.plan_name}
                disabled
              />
            </div>

            {/* Customer ID with Copy Button */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Customer ID
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                  type="text"
                  value={subscription.customer_id}
                  disabled
                />
                <button
                  onClick={() => handleCopy(subscription.customer_id)}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Dates */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Started
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                type="text"
                value={new Date(
                  subscription.current_start * 1000
                ).toLocaleDateString()}
                disabled
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Expiry Date
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                type="text"
                value={new Date(
                  subscription.end_at * 1000
                ).toLocaleDateString()}
                disabled
              />
            </div>

            {subscription.status == "cancel" ? null : (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Renew Date
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed"
                  type="text"
                  value={new Date(
                    subscription.charge_at * 1000
                  ).toLocaleDateString()}
                  disabled
                />
              </div>
            )}
            <div></div>
            <div className="flex gap-[1rem] w-full justify-end">
              <button
                onClick={() => handleCancelSubscription()}
                className="button-secondary bg-accent-red-2 text-accent-red-1"
              >
                Cancel Subscription
              </button>
              <button className="button-secondary bg-accent-blue-2 text-accent-blue-1">
                Upgrade
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No subscription data available.
          </p>
        )}
      </div>
    </div>
  );
}
