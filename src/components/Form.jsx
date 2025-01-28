"use client";
import React, { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor/index"
import axios from "axios";
import { useAuthContext } from "../app/provider";

function Form({ onSubmit, setJobDetails, jobDetails, isEdit }) {
  const { profile: companyProfiles} = useAuthContext();

  useEffect(() => {
    console.log("heheheh", isEdit);

    if (isEdit) {
      console.log("hfhfhfhffj", jobDetails.company_profile_id);
      const company = companyProfiles.find(
        (c) => c.id === parseInt(jobDetails.company_profile_id)
      );

      setSelectedCompany(company);
    }
  }, [jobDetails]);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleDescriptionChange = (content) => {
    setJobDetails((prevState) => ({ ...prevState, description: content }));
  };

  const handleCompanySelect = (e) => {
    const company = companyProfiles.find(
      (c) => c.id === parseInt(e.target.value)
    );

    setSelectedCompany(company);
    if (company) {
      console.log(company.id, " --  hree");
      setJobDetails((prev) => ({
        ...prev,
        company_profile_id: company.id,
      }));
    }

    console.log(company);
  };

  return (
    <div>
      <div className="bg-background flex flex-col md:flex-row flex-wrap mx-auto w-[100%] justify-between gap-[1rem] p-[1rem] rounded-[1rem] text-[1rem] text-base-1">
        <div className="bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]">
          <div className="w-[100%] flex flex-col mb-[1rem]">
            <h3 className="text-[20px] font-medium">Company Details</h3>
            <p>Select a company from the dropdown to populate the details.</p>
          </div>

          {selectedCompany?.company_name && (
            <img
              src={selectedCompany?.image_url}
              alt="Company logo"
              className="h-16 border-base-2 border-[2px] rounded-lg"
            />
          )}

          <div className="flex flex-col w-[100%] gap-[0.5rem]">
            <label htmlFor="companySelect" className="form-label">
              Select Company
            </label>
            <select
              id="companySelect"
              className="form-inp"
              onChange={handleCompanySelect}
              value={selectedCompany?.id || ""}
            >
              <option value="">Select a company</option>
              {companyProfiles.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-grow gap-[0.5rem]">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              className="form-inp"
              id="companyName"
              type="text"
              value={selectedCompany?.company_name}
              disabled
            />
          </div>

          <div className="flex flex-col flex-grow gap-[0.5rem]">
            <label htmlFor="companyWebsite" className="form-label">
              Company Website
            </label>
            <input
              className="form-inp"
              id="companyWebsite"
              type="text"
              value={selectedCompany?.website}
              disabled
            />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            {/* <label htmlFor="companyLogo" className="form-label">
              Logo
            </label>
            <input
              type="file"
              name="image"
              id=""
              onChange={handleFileChange}
              disabled
            /> */}
          </div>
        </div>

        <div className="bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]">
          <div className="flex flex-col w-[100%] rounded-md mb-[1rem]">
            <h3 className="text-[1.2rem] font-medium">Job Details</h3>
            <p>Tell us everything about the job you are posting.</p>
          </div>

          <div className="flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between items-center">
            <div className="w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                className="form-inp"
                id="jobTitle"
                type="text"
                placeholder="Full Stack Software Engineer"
                value={jobDetails.job_title}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    job_title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-[100%] md:w-[32%] flex flex-col gap-[0.5rem]">
              <label htmlFor="commitment" className="form-label">
                Employment Type
              </label>
              <select
                name="commitment"
                id="commitment"
                className="form-inp"
                value={jobDetails.commitment}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    commitment: e.target.value,
                  }))
                }
              >
                <option value="Fulltime">FullTime</option>
                <option value="Internship">Internship</option>
                <option value="Partime">Part-Time</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between items-center">
            <div className="w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]">
              <label htmlFor="location" className="form-label">
                Primary Location
              </label>
              <input
                className="form-inp"
                id="location"
                type="text"
                placeholder="Silicon Valley"
                value={jobDetails.work_loc}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    work_loc: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-[100%] md:w-[32%] flex flex-col gap-[0.5rem]">
              <label htmlFor="remote" className="form-label">
                Remote ?
              </label>
              <select
                name="remote"
                id="remote"
                className="form-inp"
                value={jobDetails.remote}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    remote: e.target.value === "true",
                  }))
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between items-center">
            <div className="w-[100%] md:w-[32%] flex flex-col gap-[0.5rem]">
              <label htmlFor="compensation" className="form-label">
                Compensation in $
              </label>
              <input
                className="form-inp"
                id="compensation"
                type="number"
                placeholder="Annual salary"
                value={jobDetails.compensation}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    compensation: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-[100%] md:w-[32%] flex flex-col gap-[0.5rem]">
              <label htmlFor="level" className="form-label">
                Level
              </label>
              <select
                name="level"
                id="level"
                className="form-inp"
                value={jobDetails.level}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    level: e.target.value,
                  }))
                }
              >
                <option value="entry">Entry</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="w-[100%] md:w-[32%] flex flex-col gap-[0.5rem]">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-inp"
                value={jobDetails.categories}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    categories: e.target.value,
                  }))
                }
              >
                <option value="">Select category</option>
                <option value="accounting">Accounting</option>
                <option value="tech">Tech</option>
                <option value="devops">DevOps</option>
                <option value="cloud/sre">Cloud/SRE</option>
                <option value="security">Security</option>
                <option value="design">Design</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="customer">Customer</option>
                <option value="full-stack">Full-Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile</option>
                <option value="business-development">
                  Business Development
                </option>
                <option value="ai">AI</option>
                <option value="blockchain-web3">Blockchain/Web3</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-[100%] gap-[0.5rem]">
            <label htmlFor="url" className="form-label">
              Application URL or Public Email
            </label>
            <input
              className="form-inp"
              id="url"
              type="text"
              placeholder="jobs@company.com"
              value={jobDetails.job_link}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  job_link: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-[100%] gap-[0.5rem] pb-[1rem]">
            <label htmlFor="jobDesc" className="form-label">
              Job Description
            </label>
            <QuillEditor
              value={jobDetails.description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>

        {/* {!isEdit && ( */}
        <div className="flex-grow bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]">
          <div className="flex flex-col w-[100%] rounded-md mb-[1rem]">
            <h3 className="text-[1.2rem] font-medium">How can we reach you?</h3>
            <p>Just for the Get Jobs Today team.</p>
          </div>

          <div className="flex flex-col flex-grow gap-[0.5rem]">
            <label htmlFor="hrName" className="form-label">
              Name
            </label>
            <input
              className="form-inp"
              id="hrName"
              type="text"
              placeholder="Richard Horlicks"
              value={jobDetails.name}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col flex-grow gap-[0.5rem]">
            <label htmlFor="hrEmail" className="form-label">
              Email
            </label>
            <input
              className="form-inp"
              id="hrEmail"
              type="text"
              value={jobDetails.email}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
        </div>
        {/* )} */}

        <div className="w-[100%]">
          <button
            onClick={onSubmit}
            className="w-[100%] bg-accent-blue-1 p-[8px] md:p-[20px] text-[1.2rem] font-medium rounded-[8px] text-white"
          >
            {isEdit ? (
              "Update Job"
            ) : (
              <>
                Initiate Job Listing <span className="px-[0.2rem]"></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
