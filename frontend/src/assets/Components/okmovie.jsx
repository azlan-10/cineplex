export default function OkMovie({ movie }) {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 shadow-lg shadow-gray-900 mt-5 rounded-lg overflow-hidden">
      <div className="flex flex-col items-center justify-center p-3">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full sm:w-64 md:w-72 lg:w-80 h-auto object-cover rounded-md"
        />
        <div className="text-lg sm:text-xl text-center text-white font-semibold mt-3">
          {movie.Title}
        </div>
        <div className="text-md sm:text-lg text-center text-gray-300">
          {movie.Year}
        </div>
      </div>
    </div>
  );
}
