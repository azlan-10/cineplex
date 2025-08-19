require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mainrouter = require('./Routes/router')



app.use(cors());
app.use(express.json());

// All the routes starts from here and goes to mainrouter
app.use("/api" , mainrouter)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});