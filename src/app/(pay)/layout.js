import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
      {/* ✅ Razorpay Payment Gateway */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
