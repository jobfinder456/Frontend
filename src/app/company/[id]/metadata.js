import axios from "axios";

export async function generateMetadataFromCompany(params) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/${params.id}`
    );

    if (!response.data) return { title: "Company Not Found" };

    const companyName = response.data.data.company;
    const jobCount = response.data.data.totalJobs || 0; // Fallback to 0 if missing

    return {
      title: `${jobCount} Jobs at ${companyName}`, // Updated Title Format
      description: `Find ${jobCount} job openings at ${companyName}.`,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Company Not Found" };
  }
}