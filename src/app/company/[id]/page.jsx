import React from "react";
import CompanyPage from "@/components/CompanyPage";
import { generateMetadataFromCompany } from "./metadata";
import axios from "axios";

export async function generateMetadata({ params }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/${params.id}`
    );

    if (!response.data) return { title: "Company Not Found" };

    return await generateMetadataFromCompany(params);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Company Not Found" };
  }
}

function Page({ params }) {
  return (
    <div className="container mx-auto p-4">
      <CompanyPage companyId={params.id} />
    </div>
  );
}

export default Page;