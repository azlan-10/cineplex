import React from 'react';

function Searchbar({ placeholder }) {
  return (
    <div className="mt-6 sm:mt-10 px-4 sm:px-6">
      <input
        type="search"
        placeholder={placeholder}
        className="text-white w-full p-2.5 sm:p-3.5 text-sm sm:text-base bg-transparent border border-blue-50 rounded-lg outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}

export default Searchbar;
