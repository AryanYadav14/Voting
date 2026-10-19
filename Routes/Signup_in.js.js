const express = require('express');
const route = express.Router();
const User = require('../Models/UserSchema');

route.post('/signup', async(req, res)=> {
    try{
        const data = req.body;
        const newUser = new User(data);
        const saveUser = await newUser.save();

        console.log('New User saved succesfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

module.exports = route;