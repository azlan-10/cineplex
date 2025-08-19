import React, { useEffect, useState } from 'react';
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/movies/lolo?search=2024&page=${page}`)
      .then((response) => {
        setMovies(prevMovies => [...prevMovies, ...response.data.Search]);
        setAllMovies(response.data.totalResults);
      })
      .catch((err) => {
        console.error("Error fetching movies", err);
      });
  }, [page]);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, idx) => (
          <Ok key={idx} mov={movie} />
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= allMovies}
          className={`bg-blue-400 hover:bg-blue-500 shadow p-3 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          See More
        </button>
      </div>
    </div>
  );
}

function Ok({ mov }) {
  return (
    <div className='bg-gray-800 hover:bg-gray-700 shadow-lg shadow-gray-900 rounded-lg overflow-hidden'>
      <div className='flex flex-col items-center justify-center p-3'>
        <img
          src={mov.Poster}
          alt={mov.Title}
          className='w-full sm:w-64 md:w-72 lg:w-80 h-auto object-cover rounded-md'
        />
        <div className='text-lg sm:text-xl text-center text-white font-semibold mt-3'>{mov.Title}</div>
        <div className='text-md sm:text-lg text-center text-gray-300'>{mov.Year}</div>
      </div>
    </div>
  );
}

export default Movies;
