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
app.use(express.urlencoded({ extended: false }));

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
const authRouter = require('./routes/auth');

app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/exercises-entries', passport.authenticate('jwt', {session: false}), exercisesEntriesRouter);
app.use('/auth', authRouter)

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});