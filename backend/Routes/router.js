const express = require('express');
const router = express.Router();


// Importing individual route modules
const authrouter = require('./auth');    // Handles authentication (signup, login)
const movierouter = require('./movies'); // Handles movie-related operations
const userrouter = require('./users');   // Handles user profile & data


// Route definitions
router.use('/auth' , authrouter); 
router.use('/movies' , movierouter); 
router.use('/users' , userrouter);


module.exports = router;