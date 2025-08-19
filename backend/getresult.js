const  axios  = require('axios');
const API_KEY = process.env.API_KEY


  async function getmovies(search) {
   try {
  const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`);
   return response.data;
} catch (error) {
    console.error('Error fetching  movies:', error);
    return [];
   }
}

module.exports = getmovies;