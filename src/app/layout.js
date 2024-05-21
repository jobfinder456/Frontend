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
  title: 'Get Jobs Today',
  description:
    'A job platform where job seekers can apply to a wide range of jobs, and a versatile job hosting site for companies and startups to get excellent talent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon[0].href} />
        <GoogleTagManager gaId="G-S3V1MYKXW3" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
