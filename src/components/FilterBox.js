"use client";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { FiSearch, FiPlus } from "react-icons/fi";

export const FilterBox = ({ onSearch, onAddRecord }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="bg-white p-4 shadow-sm rounded-lg flex items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-300"
        />
      </div>

      <button
        onClick={onAddRecord}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
      >
        <FiPlus className="mr-2" />
        Add Record
      </button>
    </div>
  );
};
