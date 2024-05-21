import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}');
            `,
          }}
        ></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
