const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/DB');
const router = require('./Routes/UserRouts');
const cors = require('cors');
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS with specific options if needed
app.use(cors());

app.get("/" ,(req, res) =>{   
   res.send("Project home page");  
    }
);
// Use express.json() for parsing the request body
app.use(express.json());

app.use('/auth',router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});