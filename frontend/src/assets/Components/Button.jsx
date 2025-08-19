import React from 'react';

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-base sm:text-lg md:text-xl text-gray-300 text-center p-2 sm:p-3 rounded-lg font-semibold mt-4 sm:mt-6 shadow-lg w-full"
    >
      {label}
    </button>
  );
}

export default Button;
