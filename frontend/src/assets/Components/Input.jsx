import React from 'react';

function Input({ label, placeholder, onChange }) {
  return (
    <div className="flex flex-col gap-1 pt-3 sm:pt-5">
      <label className="text-blue-50 text-sm sm:text-base p-1.5">{label}</label>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 text-blue-50 p-2 sm:p-3 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none w-full"
      />
    </div>
  );
}

export default Input;
