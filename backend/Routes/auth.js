const express = require('express');
const jwt = require('jsonwebtoken');
const {signupschema, loginschema} = require('../zod');
const router = express.Router();
const User = require('../db');
const  JWT_SECRET  = require('../config');
console.log(JWT_SECRET);



// Sign up , creating new user end point
router.post('/signup' , async(req,res) => {
  const {success} = signupschema.safeParse(req.body);
  
  if(!success){
    return res.status(400).json({
     Message : "Zod Validation failed"
    })
 }
 
 const {email , firstname , lastname , password } = req.body;

 const existinguser = await User.findOne({email})

 if (existinguser) {
    return res.status(409).json({
        Message : "User already Present"
    })
 }

 const dbuser = await User.create({
    email,
    firstname,
    lastname,
    password
 })
 
 const userId = dbuser._id;

 const token = jwt.sign({userId} , JWT_SECRET);

 res.status(200).json({
     message: "User Created Successfully",
     token,
})
})


// Login in endpoint
router.post('/login' , async(req,res) => {
    const {success} = loginschema.safeParse(req.body);

    if(!success){
       return res.status(400).json({
        Message : "Zod Validation failed"
       })
    }

    const {email , password} = req.body;

    const existinguser = await User.findOne({email,password})
    
    if (!existinguser) {
        return res.status(401).json({
         message: "Invalid credentials"
        })
    }

    const userId = existinguser._id;

    const token = jwt.sign({userId} , JWT_SECRET);

 if (existinguser) {
     res.status(200).json({
        Message : "Login Successful",
        token
    })
 }
})



module.exports= router;

