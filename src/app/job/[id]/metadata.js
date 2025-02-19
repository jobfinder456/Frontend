import { JSDOM } from "jsdom"; // To strip HTML tags safely

export function generateMetadataFromData(data) {
  if (!data) return { title: "Job Not Found" };

  const { company_name, job_title, description, work_loc, remote } = data;

  // Strip HTML tags from description
  const dom = new JSDOM(description);
  const textContent = dom.window.document.body.textContent || "";

  return {
    title: `${job_title} at ${company_name}`,
    description: `Apply now for ${job_title} job at ${company_name} (${remote ? "REMOTE" : work_loc}). ${textContent.slice(0, 15)}...`,
  };
}
