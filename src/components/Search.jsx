"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

function Search({
  setSearchValue,
  setLocValue,
  setRemoteValue,
  onFilterChange,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    onFilterChange(id, value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-[0.5rem] md:gap-[1rem] bg-background p-[0.5rem] md:p-[1rem] rounded-[12px] md:rounded-[24px]">

      <div>
        
      </div>
      <input
        type="text"
        placeholder="Search for role"
        className="text-[1rem] md:text-[1.2rem] rounded-[8px] md:rounded-[1rem] w-[100%] md:w-[48%] p-[0.5rem] md:p-[1rem]"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="w-[100%] md:w-[48%] bg-white rounded-[8px] md:rounded-[1rem] flex items-center justify-between">
        <input
          type="text"
          placeholder="Location"
          className="text-[1rem] md:text-[1.2rem] rounded-[8px] md:rounded-[1rem] w-[60%] md:w-[70%] p-[0.5rem] md:p-[1rem]"
          onChange={(e) => setLocValue(e.target.value)}
        />

        <div className="w-[40%] flex items-center gap-[0.5rem] md:gap-[1rem]">
          <input
            type="checkbox"
            className="w-[1.2rem] h-[1.2rem] rounded-[10px] md:rounded-[1rem] p-[0.5rem] md:p-[1rem]"
            onChange={(e) => setRemoteValue(e.target.checked)}
          />
          <label className="text-[1rem] md:text-[1.2rem] text-[#13131391]">
            Remote?
          </label>
        </div>
      </div>

      <button
        onClick={toggleFilters}
        className="bg-white rounded-[8px] md:rounded-[1rem] flex items-center justify-between p-[1rem]"
      >
        <IoFilter />
      </button>

      {showFilters && (
        <div className="flex flex-wrap gap-[0.5rem]">
          <select
            id="commitment"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="">Select commitment</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>

          <select
            id="level"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="">Select level</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="manager">Manager</option>
          </select>

          <select
            id="categories"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="">Select category</option>
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
        </div>
      )}
    </div>
  );
}

export default Search;
