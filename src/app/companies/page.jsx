"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ComapniesPage() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies`
      );
      //console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="  max-w-[75rem] mx-auto mb-[2rem] px-[1rem]">
      <div className="flex flex-wrap gap-[1rem] max-w-[75rem] mx-auto">
        {data.map((company) => (
          <div
            onClick={() => router.push(`/company/${company.company_name}`)}
            key={company.company_name}
            className="flex-grow flex gap-[1rem] basis-full min-[464px]:basis-1/3 sm:basis-1/4 lg:basis-1/4 max-w-full bg-background bg-opacity-50 rounded-[8px] p-[0.65rem] sm:p-[1rem]"
          >
            <img
              src={company.image_url}
              alt=""
              className="w-14 h-14 rounded-[8px] overflow-hidden"
            />

            <div>
              <h2 className="font font-medium sm:text-[1.1rem]">
                {company.company_name}
              </h2>
              <p className="text-sm font-light">{company.total_jobs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComapniesPage;
