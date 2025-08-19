const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

const authmiddleware = (req,res,next) => {
const authHeader = req.headers.authorization;


if( !(authHeader && authHeader.startsWith('Bearer '))){
    return res.status(403).json({ message : "Token missing"});
 }

const token =  authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token , JWT_SECRET);
    if (decoded.userId) {
        req.userId = decoded.userId;
        next();
       }
       else{
        res.status(401).json({msg: "some error"})
       }
  } catch (error) {
    return res.json({
        Message: "Cannot Decode"
    })
  }

}


module.exports= authmiddleware;

