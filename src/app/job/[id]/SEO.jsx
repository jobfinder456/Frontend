import Head from "next/head";

const SEO = ({ job }) => {
  if (!job) return null;

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.job_title,
    "description": job.description.replace(/(<([^>]+)>)/gi, ""), // Strip HTML tags
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company_name,
      "sameAs": job.website || ""
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": job.address || "",
        "addressLocality": job.work_loc || "Unknown",
        "addressRegion": job.state || "",
        "postalCode": job.zip_code || "",
        "addressCountry": job.country || "Unknown"
      }
    },
    "datePosted": job.date_posted || new Date().toISOString(),
    "validThrough": job.valid_through || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.commitment || "FULL_TIME",
    "baseSalary": job.compensation
      ? {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": job.compensation,
            "unitText": "YEAR"
          }
        }
      : undefined,
    "jobLocationType": job.remote ? "TELECOMMUTE" : "OnSite",
    "applicantLocationRequirements": job.remote
      ? { "@type": "Country", "name": "Remote" }
      : undefined,
    "directApply": true
  };

  return (
    <Head>
      <title>{`${job.job_title} at ${job.company_name}`}</title>
      <meta
        name="description"
        content={`${job.company_name} is hiring for ${job.job_title}. Apply now!`}
      />
      <script type="application/ld+json">
        {JSON.stringify(jobSchema)}
      </script>
    </Head>
  );
};

export default SEO;
