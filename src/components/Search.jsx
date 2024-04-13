import React from 'react';

function Search({ setSearchValue, setLocValue }) {
  return (
    <div className="mt-[1rem] md:mt-[3rem] flex flex-col md:flex-row justify-between items-center gap-[1rem] md:gap-[2rem]">
      <input
        type="text"
        placeholder="search for role"
        className="text-[1rem] md:text-[1.2rem] rounded-[10px] md:rounded-[20px] w-[100%] md:w-[49%] p-[0.5rem] md:p-[1rem]"
        onChange={e => setSearchValue(e.target.value)}
      />
      <div className="w-[100%] md:w-[49%] bg-white rounded-[10px] md:rounded-[20px] flex items-center justify-between">
        <input
          type="text"
          placeholder="location"
          className="text-[1rem] md:text-[1.2rem] rounded-[10px] md:rounded-[20px] w-[60%] md:w-[70%] p-[0.5rem] md:p-[1rem]"
          onChange={e => setLocValue(e.target.value)}
        />
        <div className="w-[40%] flex items-center gap-[0.5rem] md:gap-[1rem]">
          <input
            type="checkbox"
            placeholder="Remote"
            className="w-[1.2rem] h-[1.2rem] rounded-[10px] md:rounded-[20px] p-[0.5rem] md:p-[1rem]"
            onChange={() => setLocValue("")}
          />
          <label className="text-[1rem] md:text-[1.2rem] text-[#13131391]">Remote ?</label>
        </div>
      </div>
    </div>
  );
}

export default Search;
