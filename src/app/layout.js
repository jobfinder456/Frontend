"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./provider";
import Navbar from "@/components/Navbar";
import HelpComponent from "@/components/HelpModal";
import TitleUpdater from "@/components/TitleUpdater"; // ✅ Import new component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Find Developer, Designer, Finance & Engineering Jobs | GetJobs.today" />
        <meta name="description" content="Find remote and onsite jobs in development, design, finance, and engineering. GetJobs.today helps job seekers connect with top employers. Apply now!" />
        <meta name="keywords" content="jobs, job search, developer jobs, designer jobs, remote jobs, engineering jobs, software jobs, IT jobs, marketing jobs, finance jobs" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="GetJobs.today" />
        <meta property="og:site_name" content="Get Jobs Today" />
        <meta property="og:url" content="https://getjobs.today/" />
        <meta property="og:image" content="/images/favicon.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find Developer, Designer, Finance & Engineering Jobs | GetJobs.today" />
        <meta name="twitter:description" content="Find remote and onsite jobs in development, design, finance, and engineering." />
        <meta name="twitter:image" content="/images/favicon.png" />
        <link rel="canonical" href="https://getjobs.today/" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <main className="bg-zinc-50 w-full min-h-screen">
            <div className="relative max-w-[72rem] mx-auto">
              <Toaster />
              <Navbar />
              {children}
              <HelpComponent />
            </div>
          </main>
        </AuthProvider>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-S3V1MYKXW3"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S3V1MYKXW3');`}
        </Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </body>
    </html>
  );
}
