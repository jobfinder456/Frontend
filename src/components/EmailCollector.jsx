"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EmailCollector({ isHome }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState(["", "", ""]);

  async function submitForm() {
    if (!name || !email || !resume || skills.filter(Boolean).length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      console.log(1)
      // Get signed URL for S3
      const res = await axios.post(
        `http://localhost:8282/api/v1/s3Resume`,
        { contentType: resume.type }
      );
      console.log(2)
      console.log(res)
      console.log(res.data.data.signedUrl)

      // Upload file to S3
      await axios.put(res.data.data.signedUrl, resume, {
        headers: { "Content-Type": resume.type },
      });
      console.log(3)

      // Submit form data
      const response = await axios.post(
        `http://localhost:8282/api/v1/resume`,
        {
          name: name,
          email: email,
          fileLink: res.data.data.fileLink,
          position: skills.filter(Boolean),
        }
      );

      toast.success("Form submitted successfully");
      setIsModalOpen(false);
      console.log(response);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  }

  const contentJsx = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Your Application</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={(e) => setResume(e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {skills.map((skill, index) => (
            <div key={index}>
              <label
                htmlFor={`skill-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Skill {index + 1}
              </label>
              <input
                type="text"
                id={`skill-${index}`}
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  setSkills(newSkills);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={submitForm}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-base-1 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toaster />
      <div
        className={`${
          isHome ? `bg-background p-[1rem]` : ""
        } rounded-[16px] flex flex-wrap gap-[1rem]`}
      >
        {isHome && (
          <label htmlFor="email" className="font-medium text-base-1 mb-[1rem]">
            Be the first one to apply any job. We will send you similar job post
            Supafast!
          </label>
        )}
        <button
          className={`flex-grow max-w-[19rem] ${
            isHome ? "bg-base-1" : "bg-accent-blue-1"
          } text-white font-medium rounded-[8px] md:rounded-[12px] p-[0.5rem] md:p-[1rem]`}
          onClick={() => setIsModalOpen(true)}
        >
          Submit
        </button>
      </div>
      {isModalOpen && contentJsx()}
    </>
  );
}

export default EmailCollector;
