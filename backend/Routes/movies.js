const express = require('express');
const authmiddleware = require('../middleware');
const  getmovies  = require('../getresult');
const User = require('../db');
const axios = require('axios');


const router = express.Router();

//Searching movies end point
router.get('/search', authmiddleware, async(req,res) => {
  const userId = req.userId;
  const search = req.query.search;
  
  const existinguser = await User.findOne({
    _id:userId
  })
  
  if (!existinguser) {
    return res.status(411).json({ message : "User not found"})
  }
  
  const movies = await getmovies(search);
 try {
  await User.updateOne(
    {_id:userId},
    {$push:{searchhistory:search}}
  )
  res.json(movies);
 } catch (error){
  console.log("some error" , error);
  }
 })


//  Add a movie to favorites
router.post('/favourite' , authmiddleware,  async(req,res) => {
  const userId = req.userId;
  
  const { title,year,IMDbid,poster} = req.body;

    const existinguser = await User.findOne({
      _id:userId
    })
    
   
      if (!existinguser) {
      return res.status(411).json({ message : "User not found"})
      }


try {
     await User.updateOne(
          {_id:userId},
          {$push:{favourites:{
            title,
            year,
            IMDbid,
            poster
          }}}
)
 res.json({
          message : "Added to favourites"
        })
      } catch (error) {
        console.log("Some error adding to favourite" , error)
      } 
})

// getting favourite back from DB
router.get('/favourite' , authmiddleware, async(req,res) => {
  const userId = req.userId;

  const existinguser = await User.findOne({
    _id:userId
  })
  
 
    if (!existinguser) {
    return res.status(411).json({ message : "User not found"})
    }

    try {
res.json({
       favourites: existinguser.favourites
      })
    } catch (error) {
      console.log("Some error adding to favourite" , error)
    }
})

// Remove a movie from favorites
router.delete('/removefavourite' , authmiddleware, async(req,res) => {
  const userId = req.userId;

  const existinguser = await User.findOne({
    _id:userId
  })
  
 
    if (!existinguser) {
    return res.status(411).json({ message : "User not found"})
    }
    
    const {IMDbid} = req.body;
    try {
     await User.updateOne(
        {_id:userId},
        {$pull:{favourites:{
          IMDbid: IMDbid
 }}}
      )

    res.json({
      Message : "Deleted Successfully"
      })
    } catch (error) {
      console.log("Some error adding to favourite" , error)
    }
})

router.get('/lolo' , async (req,res) => {
const search = req.query.search;
  
 const movies = await getmovies(search);
 try {
  res.json(movies);
 }  catch (error) {
    console.log("Error getting popular movies" , error);
    }
})


module.exports = router;