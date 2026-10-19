const express = require('express');
const app = express();
const db = require('./db');



app.get('/', (req, res)=>{
    console.log('Welcome to Voting App')
    res.send('Welcome to Voting App')
})





app.listen(7000, () => {
  console.log('Server is running on port 7000');
});