"use client";

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleKeyUp = (event: any) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm);

  return (
    <>
      <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%] lg:w-[665px] m-auto flex lg:justify-between items-center shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] rounded-full text-[#13b6b5] p-2 my-10">
        <BiSearch
          size={32}
          className="cursor-pointer hover:scale-125 duration-300 transition-all mr-2"
        />
        <input
          type="text"
          id="search"
          onKeyUp={handleKeyUp}
          className="border-slate-200 font-montserrat w-[90%] outline-none lg:font-[20px] font-[12px] text-sm lg:text-lg text-[rgba(184, 184, 184, 1)]"
          placeholder="Search with Creative, Modern, Professional etc"
        />
      </div>
    </>
  );
};

export default Search;
