import React, { useState } from "react";
import { RxExternalLink } from "react-icons/rx";

export default function Stats({ postData, notLive, onBulkPay }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companyProfiles = [
    { name: "Acme Corp", logo: "/api/placeholder/32/32", status: "Active" },
    { name: "Globex Inc", logo: "/api/placeholder/32/32", status: "Active" },
    { name: "Initech", logo: "/api/placeholder/32/32", status: "Active" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[100%] bg-background flex flex-col gap-[1rem] p-[0.5rem] md:p-[1rem] rounded-[24px]">
      

      <div className="flex flex-wrap gap-[0.5rem] md:gap-[1rem]">
        <div className="bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]">
          <h3 className="text-[1rem] md:text-[1.2rem] font-medium text-accent-blue-1">
            Coming Soon !
          </h3>
          <span className="text-[14px] md:text-[16px]">
            Total impressions on your job posts
          </span>
        </div>
        <div className="bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]">
          <h3 className="text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1">
            {postData.length - notLive}
          </h3>
          <span className="text-[14px] md:text-[16px]">Jobs are live now</span>
        </div>
        <div className="bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]">
          <h3 className="text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1">
            {notLive}
          </h3>
          <span className="text-[14px] md:text-[16px]">
            Jobs require payment.{" "}
            <button
              onClick={onBulkPay}
              className="flex items-center gap-[0.5rem] underline"
            >
              Pay Now <RxExternalLink />
            </button>
          </span>
        </div>
        <div className="bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]">
          <div className="w-[100%] flex justify-between items-center">
            <h3 className="text-[1rem] md:text-[1.2rem] font-medium text-accent-blue-1">
              Company Profiles
            </h3>{" "}
            <button
              onClick={openModal}
              className="bg-accent-blue-1 text-white px-[0.5rem] py-[0.05rem] rounded-[8px]"
            >
              +
            </button>
          </div>
          {companyProfiles.map((company, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-[14px] md:text-[16px]">{company.name}</span>
              <span className="text-[12px] text-green-500">
                {company.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create New Company</h2>
            {/* Add form fields for creating a new company here */}
            <p>Form fields for creating a new company would go here.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
