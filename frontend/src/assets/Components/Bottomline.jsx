import React from 'react';
import { Link } from 'react-router-dom';

function Bottomline({ label, btntext, to }) {
  return (
    <div className="p-2 sm:p-3 mt-2 sm:mt-3 text-center text-sm sm:text-md text-gray-100">
      {label}
      <Link
        className="text-blue-500 cursor-pointer ml-1 sm:ml-2 hover:underline hover:text-blue-600"
        to={to}
      >
        {btntext}
      </Link>
    </div>
  );
}

export default Bottomline;
