import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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
  title: "Get Gobs Today",
  description: "A job platform where job seekers can apply to a wide range of jobs, and a versatile job hosting site for comapnies and startup to get excellent talent",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </>
  );
}
