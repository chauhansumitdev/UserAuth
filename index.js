// requiring modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
require('dotenv').config();
// console.log(require('dotenv').config())
// initialising the app
const app = express();
const PORT =process.env.PORT || 3000;
// console.log(process.env.PORT); -> return undefined .. val sets to 3000
// console.log(app);
app.use(bodyParser.json());
// bodyparser -> middleware for parsing into inc req into json
const atlasUsername = process.env.ATLAS_USERNAME;
const atlasPassword = process.env.ATLAS_PASSWORD;
const atlasDatabase = process.env.ATLAS_DATABASE;
// accessing the data from .env
const atlasConnectionString = `mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasDatabase}.0hxepps.mongodb.net/?retryWrites=true&w=majority`;
// console.log(atlasConnectionString);
//mongodb atlas connection string 
mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
// establishing the connection
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB Atlas'));
//listening to local host PORT 3000
app.get('/', (req,res) =>{
    res.send('<h1>response from /</h1>')
    // console.log("lclhst chk");
})
app.listen(PORT , () =>{
    console.log(`running on port ${PORT}`);
})
//--------------
// user login/registration endpoint
const User = require('./model/user');
// new user registeration
app.post('/registration' , async (req, res) =>{
    try{
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message:'user registered successfully'});
    }catch(error){
        res.status(500).json({error : error.message});
    }
})
// login endpoint
app.post('/login', async (req,res) =>{
    try{

    }catch(error){
        res.status(500).json({error : error.message});
    }
})


