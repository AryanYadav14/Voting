const express = require('express');
const route = express.Router();
const candidateSchema = require('./../Models/CandidateSchema');


route.get('/ShowParty', async(req, res)=> {
    const data = await candidateSchema.find();
    res.status(200).json(data);
})


route.post('/AddParty', async(req, res)=> {
    try{
        const data = req.body;
        const newParty = new candidateSchema(data);
        const saveParty = await newParty.save();

        console.log('New Party Added in List')
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = route;