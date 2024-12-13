"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EmailCollector({ isHome }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  async function submitForm() {
    if (!name || !email || !resume || skills.length === 0) {
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
          position: skills,
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
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-base-1">
              Add upto 3 job title
            </label>
            <select
              id="skills"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="mt-1 block w-full border border-base-2 rounded-md shadow-sm p-2"
            >
              <option value="">Select job title</option>
              <option value="tech">Tech</option>
              <option value="devops">DevOps</option>
              <option value="design">Design</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="customer">Customer</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="mobile">Mobile</option>
              <option value="business-development">Business Development</option>
              <option value="ai">AI</option>
              <option value="blockchain-web3">Blockchain/Web3</option>
            </select>
            <button
              onClick={() => {
                if (selectedSkill && skills.length < 3 && !skills.includes(selectedSkill)) {
                  setSkills([...skills, selectedSkill]);
                  setSelectedSkill("");
                }
              }}
              className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-base-2 bg-background hover:bg-blue-700"
            >
              Add Skill
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Selected titles:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span>{skill}</span>
                  <button
                    onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
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
          } text-white font-medium rounded-[8px] md:rounded-[12px] p-[0.5rem] md:px-[1rem] md:py-[0.75rem]`}
          onClick={() => setIsModalOpen(true)}
        >
          Submit Details
        </button>
      </div>
      {isModalOpen && contentJsx()}
    </>
  );
}

export default EmailCollector;

