const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require('dotenv').config();

const uri = process.env.ATLAS_URI;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect( uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

// Passport middleware & config
app.use(passport.initialize());
require("./config/passport")(passport);

const exercisesEntriesRouter = require('./routes/exercise-entries');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/exercises', exercisesEntriesRouter);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});