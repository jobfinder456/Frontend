"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Script from "next/script";

export default function Pay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planid') || 'No Plan Selected';
  const [quantity, setQuantity] = useState(1);
  const baseAmount = 100;
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const totalCost = baseAmount * quantity;

  const verifySubscription = async (subscriptionId) => {
    try {
      setIsVerifying(true);
      toast.loading('Verifying payment...', { duration: 5000 });
      
      // Wait for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log('Verifying subscription:', subscriptionId);
      const response = await axios.post('http://localhost:8282/api/v1/verify-subscription', {
        subscriptionId: subscriptionId,
        email: "sk2003311@gmail.com"
      });
      console.log(response);
      
      if (response.data.success) {
        toast.success(response.data.message);
        router.push('/dashboard');
      } else {
        toast.error('Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify subscription');
    } finally {
      setIsVerifying(false);
    }
  };

  const initializeRazorpay = (subscriptionId) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      name: "Getjobs",
      description: "Test Subscription",
      theme: {
        color: "#F37254",
      },
      handler: async function (response) {
        toast.success("Payment successful!");
        await verifySubscription(subscriptionId);
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled or dismissed");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post('http://localhost:8282/api/v1/create-subscription', {
        plan_id: planId,
        quantity: quantity
      });

      if (response.data.success) {
        const subscriptionId = response.data.subscription_id;
        initializeRazorpay(subscriptionId);
      } else {
        toast.error('Failed to create subscription');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong with the payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      
      {isVerifying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-700">Verifying your payment...</p>
          </div>
        </div>
      )}
      
      <div className="flex max-w-[64rem] mx-auto p-[1rem] min-h-screen lg:py-12">
        <div className="w-full rounded-[1rem]">
          <div className="max-w-3xl mx-auto bg-zinc-100 rounded-[1rem] shadow-sm border-[1px] border-zinc-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <button 
                onClick={handleBack}
                className="mb-4 text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Invoice</h1>
                  <div className="mt-1 text-sm text-gray-600">Plan ID: {planId}</div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Date: 10/25/2025</div>
                  <div>
                    Invoice #: INV-jvbjksv
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 rounded-b-lg">
              <div className="flex flex-col gap-3 items-end">
                <div className="flex justify-between w-48 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalCost}.00</span>
                </div>
                <div className="flex justify-between w-48 text-sm text-gray-600">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between w-48 font-medium text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${totalCost}.00</span>
                </div>
                <button 
                  className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}