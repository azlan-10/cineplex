require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.Mongo_url)
.then(() => { 
    console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Error Connecting to Database");
      })

      const schema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        searchhistory:[String],
        favourites:[{
            title:String,
            year: String,
            IMDbid:String,
            poster:String,
        }]
      })

      const User = mongoose.model("Movies-user" , schema);

      module.exports = User;