const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const profileRoutes = require('./Routes/ProfileRoutes');

app.use(express.json()); // body parser
app.use('/', profileRoutes);

app.get('/', (req, res)=>{
    console.log('Welcome to Voting App')
    res.send('Welcome to Voting App')
});


const Signupuser = require('./Routes/Signup_in.js');
app.use('/', Signupuser);

const Voting = require('./Routes/Candidate.js');
app.use('/', Voting);

const Voter = require('./Routes/Voter.js');
app.use('/', Voter);

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});