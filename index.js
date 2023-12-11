// const shared = require('./shared')
// shared.exp()
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
const atlasConnectionString = `mongodb+srv://${atlasUsername}:${atlasPassword}@cluster0.mongodb.net/${atlasDatabase}?retryWrites=true&w=majority`;
// console.log(atlasConnectionString);
//mongodb atlas connection string 
mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
// establishing the connection
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB Atlas'));