import React from 'react';

function Search({ setSearchValue, setLocValue,setRemoteValue }) {

  return (

    <div className="flex flex-col md:flex-row justify-between items-center gap-[0.5rem] md:gap-[1rem] bg-background p-[0.5rem] md:p-[1rem] rounded-[12px] md:rounded-[24px]">

      <input
        type="text"
        placeholder="search for role"
        className="text-[1rem] md:text-[1.2rem] rounded-[8px] md:rounded-[1rem] w-[100%] md:w-[51%] p-[0.5rem] md:p-[1rem]"
        onChange={e => setSearchValue(e.target.value)}
      />

      <div className="w-[100%] md:w-[49%] bg-white rounded-[8px] md:rounded-[1rem] flex items-center justify-between">

        <input
          type="text"
          placeholder="location"
          className="text-[1rem] md:text-[1.2rem] rounded-[8px] md:rounded-[1rem] w-[60%] md:w-[70%] p-[0.5rem] md:p-[1rem]"
          onChange={e => setLocValue(e.target.value)}
        />

        <div className="w-[40%] flex items-center gap-[0.5rem] md:gap-[1rem]">

          <input
            type="checkbox"
            placeholder="Remote"
            className="w-[1.2rem] h-[1.2rem] rounded-[10px] md:rounded-[1rem] p-[0.5rem] md:p-[1rem]"
            onChange={(e) => setRemoteValue(e.target.value)}
          />

          <label className="text-[1rem] md:text-[1.2rem] text-[#13131391]">Remote ?</label>

        </div>

      </div>

    </div>
  );
}

export default Search;
