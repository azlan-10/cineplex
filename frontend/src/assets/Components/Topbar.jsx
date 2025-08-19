import React from 'react';

function Topbar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 gap-2 sm:gap-4">
      <div>
        <img
          src="./ok.webp"
          alt="logo"
          className="w-20 sm:w-24 h-20 sm:h-auto rounded-full bg-gray-900"
        />
      </div>
      <div>
        <h1 className="text-gray-50 text-lg sm:text-2xl font-semibold">Hello!</h1>
      </div>
    </div>
  );
}

export default Topbar;
