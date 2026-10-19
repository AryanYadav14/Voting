const express = require('express');
const route = express.Router();
const User = require('../Models/UserSchema');

route.post('/signup', async(req, res)=> {
    try{
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})