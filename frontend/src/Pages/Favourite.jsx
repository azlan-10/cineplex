import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const getFav = async () => {
      try {
        const res = await axios.get(
          `https://cineplex-xxcw.onrender.com/api/movies/favourite`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavourites(res.data.favourites);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    getFav(); 
  }, []);

  const removeFavourite = async (IMDbid) => {
    try {
      await axios.delete(
        `https://cineplex-xxcw.onrender.com/api/movies/removefavourite`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { IMDbid }, 
        }
      );
      setFavourites((prev) => prev.filter((movie) => movie.IMDbid !== IMDbid));
      alert("Removed from favourite");
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      
      <div className="flex justify-center mb-6">
        <img src="./ok.webp" alt="logo" className="w-20 sm:w-24 h-auto rounded-full bg-gray-900 p-2" />
      </div>

      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl text-center mb-6">Your Favourites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
        {favourites.map((movie) => (
          <div key={movie.id} className="bg-gray-800 relative p-3 sm:p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
            <button
              onClick={() => removeFavourite(movie.IMDbid)}
              type="button"
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-gray-900/70 hover:bg-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.928 0-3.586 1.14-4.312 2.777C11.274 4.89 9.616 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
                />
              </svg>
            </button>
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-md" 
            />
            <h2 className="text-white text-lg sm:text-xl mt-3">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourite;
