"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/app/provider"; // Adjust the import path as needed
import axios from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "@/components/Modal"; // Ensure you have a Modal component
import LogoContainer from "@/components/LogoContainer"; // Import the LogoContainer

export default function CompaniesPage() {
  const { profile, loading, setLoading } = useAuthContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  // State for edit form
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState("");

  // Handle file upload for company logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
      setCompanyLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle edit company
  const handleEdit = (company) => {
    setSelectedCompany(company);
    setCompanyName(company.company_name);
    setCompanyWebsite(company.website);
    setCompanyLogoPreview(company.image_url);
    setIsEditModalOpen(true);
  };

  // Handle delete company
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/companies/${id}`,
        { withCredentials: true }
      );
      toast.success("Company deleted successfully");
      fetchCompanies(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete company:", error);
      toast.error("Failed to delete company");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for edit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Upload the logo to AWS (if a new logo is selected)
      let fileLink = selectedCompany.image_url; // Default to the existing logo URL
      if (companyLogo) {
        const formData = new FormData();
        formData.append("file", companyLogo);

        const uploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/upload-logo`, // Replace with your AWS upload endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        fileLink = uploadResponse.data.fileLink; // Get the new logo URL from the response
      }

      // Update the company profile
      const updateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/company/profile`,
        {
          company_id: selectedCompany.id,
          company_name: companyName,
          website: companyWebsite,
          fileLink: fileLink, // Use the updated or existing logo URL
        },
        { withCredentials: true }
      );

      toast.success(updateResponse.data.message);
      setIsEditModalOpen(false);
      //fetchCompanies(); // Refresh the list
    } catch (error) {
      console.error("Failed to update company:", error);
      toast.error("Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  // Close the edit modal
  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedCompany(null);
    setCompanyName("");
    setCompanyWebsite("");
    setCompanyLogo(null);
    setCompanyLogoPreview("");
  };

  // Handle delete confirmation
  const confirmDelete = (id) => {
    setCompanyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[100%] bg-background p-[1rem] rounded-[1rem]">
      <div className="flex flex-col items-start justify-start gap-[1rem] rounded-[14px] bg-white p-[1rem]">
        <h1 className="text-lg font-semibold text-center text-gray-600 mb-4">
          Companies List
        </h1>

        {/* Companies List */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.map((company) => (
            <div
              key={company.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center gap-2"
            >
              {/* <LogoContainer imageUrl={company.image_url} alt={company.company_name} /> */}
              <img
                src={company.image_url}
                alt={company.company_name}
                className="w-20 h-20 object-contain"
              />
              <h2 className="text-lg font-semibold">{company.company_name}</h2>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(company)}
                  className="button-secondary bg-blue-50 text-accent-blue-1"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => confirmDelete(company.id)}
                  className="button-secondary bg-red-50 text-accent-red-1"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-background p-[1rem] rounded-[1rem] shadow-xl">
              <div className="bg-white p-[1.2rem] rounded-[0.85rem] flex flex-col gap-[0.5rem]">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Edit Company</h2>
                  <IoClose size={24} onClick={closeModal} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="companylogo" className="form-label">
                    Company Logo
                  </label>
                  <input
                    id="companylogo"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {companyLogoPreview && (
                    <div className="mt-2">
                      <img
                        src={companyLogoPreview}
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

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <Modal
            title="Are you sure you want to delete?"
            button1Title="No"
            button2Title="Yes"
            button1Action={() => setIsDeleteModalOpen(false)}
            button2Action={() => {
              handleDelete(companyToDelete);
              setIsDeleteModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
