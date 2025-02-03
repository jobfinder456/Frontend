import React, { useEffect, useState } from "react";
import { RxExternalLink } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useAuthContext } from "../../app/provider";

export default function Stats({ refreshTrigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [stats, setStats] = useState({
    total_impressions: 0,
    jobs_ok_true: 0,
    credits: 0,
  });
  const [loading, setLoading] = useState(false);
  //const [profile, setProfile] = useState([]); // Stores company profiles
  const { profile } = useAuthContext();

  useEffect(() => {
    fetchStats();
    //fetchProfiles();
  }, []);

const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/user/impressions`,
        { withCredentials: true }
      );
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  // const fetchProfiles = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/profile`,
  //       { withCredentials: true }
  //     );
  //     setProfile(res.data);
  //   } catch (error) {
  //     console.error("Error fetching profiles:", error);
  //   }
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setCompanyLogo(file);

      try {
        const { data: s3Response } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/s3logo`,
          {
            contentType: file.type,
          },
          { withCredentials: true }
        );

        const { signedUrl } = s3Response.data;
        setCompanyLogoPreview(s3Response.data.fileLink);
        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/profile`,
        {
          company_name: companyName,
          website: companyWebsite,
          fileLink: companyLogoPreview,
        },
        { withCredentials: true }
      );
      closeModal();
      fetchProfiles(); // Refetch profiles after submission
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[100%] bg-background flex flex-col gap-[0.5rem] sm:gap-[1rem] p-[0.5rem] md:p-[1rem] rounded-[24px]">
      {/* Stats Section */}
      <div className="flex flex-wrap gap-[0.5rem] md:gap-[1rem]">
        <div className="bg-white flex-grow flex flex-col items-start justify-start rounded-[1rem] p-[0.75rem] md:p-[1.2rem]">
          <h3 className="text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1">
            {loading ? stats.total_impressions : stats.total_impressions == null ? 0 : stats.total_impressions}
          </h3>
          <span className="text-[14px] md:text-[16px]">
            Total impressions on your job posts
          </span>
        </div>
        <div className="bg-white flex-grow flex flex-col items-start justify-start rounded-[1rem] p-[0.75rem] md:p-[1.2rem]">
          <h3 className="text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1">
            {loading ? stats.jobs_ok_true : stats.jobs_ok_true}
          </h3>
          <span className="text-[14px] md:text-[16px]">Jobs are live now</span>
        </div>
        <div className="bg-white flex-grow flex flex-col items-start justify-start rounded-[1rem] p-[0.75rem] md:p-[1.2rem]">
          <h3 className="text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1">
            {loading ? stats.credits : stats.credits}
          </h3>
          <span className="text-[14px] md:text-[16px]">
            Available Credits{" "}
            <a
              href={`${process.env.NEXT_PUBLIC_FRONT}/pricing`}
              className="flex items-center gap-[0.5rem] underline"
            >
              Upgrade ? <RxExternalLink />
            </a>
          </span>
        </div>
      </div>

      {/* Company Profiles Section */}
      <div className="bg-white flex-grow flex flex-col items-start justify-start rounded-[1rem] p-[0.75rem] md:p-[1.2rem] min-h-[8rem]">
        <div className="w-[100%] flex justify-between items-center">
          <h3 className="text-[1rem] md:text-[1.2rem] font-medium text-accent-blue-1">
            Company Profiles
          </h3>
          <button
            onClick={openModal}
            className="bg-accent-blue-1 text-white px-[0.5rem] py-[0.05rem] rounded-[8px]"
          >
            +
          </button>
        </div>
        <div className="mt-[1rem] flex flex-col gap-[0.5rem]">
          {profile.map((company, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={company.image_url}
                alt={`${company.company_name} logo`}
                className="w-8 h-8 rounded-[0.5rem]"
              />
              <span className="text-[14px] md:text-[16px]">
                {company.company_name}
              </span>
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {company.website}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding a New Company */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background p-[1rem] rounded-[1rem] shadow-xl ">
            <div className="bg-white p-[1.2rem] rounded-[0.85rem] flex flex-col gap-[0.5rem]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create New Company</h2>
              <IoClose size={24} onClick={closeModal} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="companylogo" className="form-label">
                Company Logo
              </label>
              <input id="companylogo" type="file" onChange={handleFileChange} />
              {companyLogoPreview && (
                <div className="mt-2">
                  <img
                    src={`${companyLogoPreview}`}
                    alt="Company Logo Preview"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                className="form-inp"
                id="companyName"
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="companyWebsite" className="form-label">
                Company Website
              </label>
              <input
                className="form-inp"
                id="companyWebsite"
                type="text"
                placeholder="https://abc.com"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="button-primary">
              Submit
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
