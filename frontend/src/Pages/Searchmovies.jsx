import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MovieSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://cineplex-xxcw.onrender.com/api/movies/search?search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.Search) setMovies(res.data.Search);
      else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
  };

  const handleFav = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("⚠️ Please login first!");

      await axios.post(
        `https://cineplex-xxcw.onrender.com/api/movies/favourite`,
        {
          title: movie.Title ?? movie.title,
          year: movie.Year ?? movie.year,
          IMDbid: movie.imdbID ?? movie.IMDbid,
          poster: movie.Poster ?? movie.poster,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Added to favourites!");
    } catch (err) {
      console.error("Error adding to favourites:", err);
      alert("❌ Failed to add to favourites");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white px-4 sm:px-6 lg:px-10 py-10">
      
      <div className="flex flex-col sm:flex-row justify-center items-center mb-8 relative gap-4 sm:gap-0">
        <img
          src="./ok.webp"
          alt="logo"
          className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-4 border-purple-600 shadow-lg"
        />
        <button
          onClick={() => navigate('/favourite')}
          className="sm:absolute right-0 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold w-full sm:w-auto"
        >
          See your Favourites
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4 sm:gap-0">
        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-3 rounded-l-xl sm:rounded-l-xl rounded-t-xl sm:rounded-t-none bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl bg-purple-600 hover:bg-purple-700 transition font-semibold"
        >
          Search
        </button>
      </form>

      {error && <p className="text-center text-red-400 font-medium mb-6">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-4">
        {movies.map((m, i) => {
          const title = m.Title ?? m.title ?? "Untitled";
          const year = m.Year ?? m.year ?? "–";
          const poster = (m.Poster ?? m.poster) !== "N/A" ? (m.Poster ?? m.poster) : "./no-image.jpg";
          const key = m.imdbID ?? m.IMDbid ?? `${title}-${year}-${i}`;

          return (
            <div
              key={key}
              className="bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col relative"
            >
              <div className="relative">
                <img
                  src={poster}
                  alt={title}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
                <button
                  onClick={() => handleFav(m)}
                  type="button"
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-gray-900/70 hover:bg-gray-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    stroke="currentColor"
                    className="w-5 sm:w-6 h-5 sm:h-6 text-pink-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.928 0-3.586 1.14-4.312 2.777C11.274 4.89 9.616 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold truncate">{title}</h3>
                  <p className="text-sm text-gray-400">{year}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
