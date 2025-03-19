import Head from "next/head";

export default function JobDetails({ details }) {
  if (!details) return <p className="text-center text-gray-600">Loading job details...</p>;

  const jobData = details; // Use the passed data directly

  // Generate JSON-LD structured data
  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": jobData.job_title,
    "description": jobData.description.replace(/(<([^>]+)>)/gi, ""), // Strips HTML tags
    "hiringOrganization": {
      "@type": "Organization",
      "name": jobData.company_name,
      "sameAs": jobData.company_website || ""
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": jobData.address || "",
        "addressLocality": jobData.work_loc || "Unknown",
        "addressRegion": jobData.state || "",
        "postalCode": jobData.zip_code || "",
        "addressCountry": jobData.country || "Unknown"
      }
    },
    "datePosted": jobData.date_posted || new Date().toISOString(),
    "validThrough": jobData.valid_through || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": jobData.employment_type || "FULL_TIME",
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": jobData.currency || "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": jobData.salary || 0,
        "unitText": "YEAR"
      }
    },
    "jobLocationType": jobData.remote ? "TELECOMMUTE" : "OnSite",
    "applicantLocationRequirements": jobData.remote ? { "@type": "Country", "name": "Remote" } : undefined
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
      </Head>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{jobData.job_title}</h1>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{jobData.company_name}</h2>
      <p className="text-gray-600 mb-2 flex items-center">
        📍 <span className="ml-1">{jobData.remote ? "Remote" : jobData.work_loc}</span>
      </p>
      <p className="text-gray-800 leading-6">{jobData.description}</p>
    </div>
  );
}
