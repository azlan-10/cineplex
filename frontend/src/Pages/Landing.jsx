import React, { useState } from 'react';
import Movies from '../assets/Components/movies';
import OkMovie from '../assets/Components/okmovie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Landing() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/api/movies/lolo?search=${search}`);
      if (res.data && res.data.Search) {
        setMovies(res.data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      
      
      <div className="flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-gray-700 pb-6 gap-4 md:gap-0">
        <img
          src="./ok.webp"
          alt="logo"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-900"
        />
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 drop-shadow-lg">
          Cineplex!! Customize Your Own Favourite Movies
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          <button
            onClick={() => navigate('/signup')}
            className="text-white p-2 sm:px-4 rounded-md bg-gradient-to-r from-blue-300 to-purple-400 drop-shadow-lg transition-all duration-300 hover:from-purple-400 hover:to-blue-300"
          >
            Signup
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="text-white p-2 sm:px-4 rounded-md bg-gradient-to-r from-blue-300 to-purple-400 drop-shadow-lg transition-all duration-300 hover:from-purple-400 hover:to-blue-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center mb-8 w-full gap-4 sm:gap-0">
        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-full sm:max-w-md px-4 py-3 rounded-l-xl sm:rounded-l-xl rounded-t-xl sm:rounded-t-none bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 sm:ml-0 sm:rounded-r-xl px-6 py-3 rounded-b-xl sm:rounded-b-none bg-purple-600 hover:bg-purple-700 transition duration-200 font-semibold"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-400 font-medium mb-6">{error}</p>
      )}

      {/* Movie List */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {movies.map((movie, idx) => (
            <OkMovie key={idx} movie={movie} />
          ))}
        </div>
      ) : (
        <Movies />
      )}
    </div>
  );
}

export default Landing;
