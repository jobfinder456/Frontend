import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  icons: {
    icon: [
      {
        url: '/images/favicon.png', // /public path
        href: '/images/favicon.png', // /public path
      },
    ],
  },
  title: 'Get your Dream Job today : Job Opening - Discover Developer, Designer, Finance, Sales and more jobs.',
  description:
  'Discover top job opportunities and hire exceptional talent at GetJobs.Today. GetJobs.Today job board connects job seekers with a vast range of positions in startups, established companies, and diverse industries, offering roles such as Developer jobs, Design jobs, Accountant jobs, Finance jobs, Sales jobs, Manager roles, and more. Employers can easily post jobs for free and attract talented candidates. Start your job search or post your job listing today on GetJobs.Today and take the next step in your career or hiring process.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta property="og:title" content="Get your Dream Job today : Job Opening - Discover Developer, Designer, Finance, Sales and more jobs." />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:site_name" content="Get Jobs Today" />
        <meta property="og:url" content="https://getjobs.today/" />
        <meta property="og:image" content="/images/favicon.png" />
        <meta name="twitter:card" content="summary"></meta>
        <link rel="icon" href={metadata.icons.icon[0].href} />
      </Head>
      <body className={inter.className}>
        {children}
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
