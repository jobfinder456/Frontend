import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./provider";
import Navbar from "@/components/Navbar";
import HelpComponent from "@/components/HelpModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        href: "/images/favicon.png",
      },
    ],
  },
  title: "Find Developer, Designer, Finance & Engineering Jobs | GetJobs.today",
  description:
    "Kickstart your career with GetJobs.today! Explore top job listings in development, design, sales, finance, engineering, healthcare, marketing, and more. Our platform connects job seekers with tailored opportunities. Find and apply for your dream job today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:site_name" content="Get Jobs Today" />
        <meta property="og:url" content="https://getjobs.today/" />
        <meta property="og:image" content="/images/favicon.png" />
        <meta name="twitter:card" content="summary"></meta>
        <link rel="icon" href={metadata.icons.icon[0].href} />
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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S3V1MYKXW3"
        ></Script>
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
