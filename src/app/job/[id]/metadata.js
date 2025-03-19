import { JSDOM } from "jsdom"; // To strip HTML tags safely

export function generateMetadataFromData(data) {
  if (!data) {
    return { 
      title: "Job Not Found", 
      description: "This job listing is unavailable." 
    };
  }

  const { 
    company_name = "Unknown Company", 
    job_title = "Job Opening", 
    description = "", 
    work_loc = "Location Unknown", 
    remote 
  } = data;

  // Strip HTML tags from description safely
  const dom = new JSDOM(description);
  const textContent = dom.window.document.body.textContent || "";

  // Construct the location string
  const location = remote ? "Remote" : work_loc;

  // Trim title to 60 characters max (keeps job title, company, and location)
  const title = `${job_title} at ${company_name} - ${location}`.slice(0, 60);

  // Trim description to 150-160 characters max
  const metaDescription = `${company_name} is hiring for ${job_title} (${location}). ${textContent.slice(0, 140)}...`.slice(0, 160);

  return { title, description: metaDescription };
}
