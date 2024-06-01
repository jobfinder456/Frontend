import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: [
      {
        url: "/images/favicon.png", // /public path
        href: "/images/favicon.png", // /public path
      },
    ],
  },
  title: "Discover Developer, Designer, Finance, Sales and more jobs. ",
  description:
    "Explore top job opportunities and find exceptional talent at GetJobs.Today. Connect with Developer, Design, Accounting, Finance, Sales, and Management roles. Employers can post for free. Start your search or post a job now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta
          property="og:title"
          content={metadata.title}
        />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:site_name" content="Get Jobs Today" />
        <meta property="og:url" content="https://getjobs.today/" />
        <meta property="og:image" content="/images/favicon.png" />
        <meta name="twitter:card" content="summary"></meta>
        <link rel="icon" href={metadata.icons.icon[0].href} />
      </Head>
      <body className={inter.className}>
        {children}
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
