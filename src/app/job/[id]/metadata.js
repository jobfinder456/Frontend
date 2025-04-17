
import axios from "axios";

export default async function generateMetadataFromJob(params) {
  try {
    const jobId = params.id.split("-").pop();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/jobs/${jobId}`
    );

    const details = response.data;

    const metadata = {
      title: `${details.job_title} at ${details.company_name}`,
      description: `${details.company_name} is hiring for ${details.job_title} in ${details.work_loc}`,
    };

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: details.job_title,
      description: details.description,
      identifier: {
        "@type": "PropertyValue",
        name: details.company_name,
        value: jobId,
      },
      datePosted: new Date(details.posted_on || new Date()).toISOString(),
      validThrough: new Date(
        details.expiry_date || Date.now() + 1000 * 60 * 60 * 24 * 30
      ).toISOString(),
      employmentType: details.commitment,
      hiringOrganization: {
        "@type": "Organization",
        name: details.company_name,
        sameAs: details.website,
        logo: details.image_url,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: details.work_loc,
          addressCountry: "IN", // change if needed
        },
      },
      baseSalary: details.compensation
        ? {
            "@type": "MonetaryAmount",
            currency: "USD", // change if needed
            value: {
              "@type": "QuantitativeValue",
              value: details.compensation,
              unitText: "YEAR",
            },
          }
        : undefined,
    };

    return {
      ...metadata,
      other: {
        "application/ld+json": JSON.stringify(structuredData),
      },
    };
  } catch (err) {
    console.error("Metadata generation error:", err);
    return {
      title: "Job Not Found",
      description: "This job might have expired or is unavailable.",
    };
  }
}
