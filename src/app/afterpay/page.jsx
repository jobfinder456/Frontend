"use client";
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Home, Mail } from 'lucide-react';
import JSConfetti from 'js-confetti';

const PaymentResponsePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const success = searchParams.get('success');
  const jobId = searchParams.get('jobId');
  const orderId = searchParams.get('orderId');
  const isSuccess = success === 'true';

  useEffect(() => {
    if (isSuccess) {
      const jsConfetti = new JSConfetti();
      
      // Initial confetti burst
      jsConfetti.addConfetti({
        emojis: ['🌟', '✨', '💫', '⭐', '🎉', '🎊'],
        emojiSize: 50,
        confettiNumber: 100,
      });

      // Second burst with different emojis after a short delay
      setTimeout(() => {
        jsConfetti.addConfetti({
          confettiColors: [
            '#FFD700', // Gold
            '#FFA500', // Orange
            '#FF6347', // Tomato
            '#87CEEB', // Sky Blue
            '#98FB98', // Pale Green
            '#DDA0DD', // Plum
          ],
          confettiNumber: 200,
          confettiRadius: 6,
        });
      }, 800);
      console.log('Payment successful! 🎉');

      // Cleanup function
      return () => {
        jsConfetti.clearCanvas();
      };
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Success/Failure Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col items-center space-y-4 p-6 border-b">
          {isSuccess ? (
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500" />
          )}
          <h2 className="text-2xl font-semibold text-center">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h2>
          {isSuccess && (
            <div className="text-xl text-center text-green-600 font-semibold">
              Thank you for your purchase!
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Job ID:</span>
              <span className="font-medium">{jobId}</span>
            </div>
          </div>

          {isSuccess && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Mail className="w-4 h-4" />
              <span>Invoice and confirmation details have been sent to your email.</span>
            </div>
          )}
          
          <div className="pt-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResponsePage;