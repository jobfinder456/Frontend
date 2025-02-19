"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function TitleUpdater() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState(
    "Find Developer, Designer, Finance & Engineering Jobs | GetJobs.today"
  );

  useEffect(() => {
    if (pathname.startsWith("/job/")) {
      setPageTitle("Job Details - GetJobs.today");
    } else if (pathname.startsWith("/about")) {
      setPageTitle("About Us - GetJobs.today");
    } else {
      setPageTitle(
        "Find Developer, Designer, Finance & Engineering Jobs | GetJobs.today"
      );
    }
  }, [pathname]);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
    </Head>
  );
}
