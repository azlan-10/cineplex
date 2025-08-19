const express = require('express');
const authmiddleware = require('../middleware');

const User = require('../db');


const router = express.Router();

//Get user search history
router.get('/history' , authmiddleware, async(req,res) => {
  const userId = req.userId;

  const existinguser = await User.findOne({
      _id:userId
    })
    
   
      if (!existinguser) {
      return res.status(411).json({ message : "User not found"})
      }

      try {
        res.json({
          searchhistory: existinguser.searchhistory
        })
      } catch (error) {
        console.log("Some error in getting saved history" , error);
        }
})

//deletes the search history
router.delete('/removesearch',authmiddleware, async (req, res) => {
  const userId = req.userId;
  const { search } = req.body;  

  try {
     await User.updateOne(
          { _id: userId },
          { $pull: { searchhistory: search } }  // Remove matching string
      );

      res.json({ message: 'Search term removed' });
  } catch (error) {
      console.error('Error removing search term:', error);
      res.status(500).json({ message: 'Error deleting search term' });
  }
});

module.exports = router;