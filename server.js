const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json()); // body parser

app.get('/', (req, res)=>{
    console.log('Welcome to Voting App')
    res.send('Welcome to Voting App')
})




const Signupuser = require('./Routes/Signup_in.js');
app.use('/', Signupuser);

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});