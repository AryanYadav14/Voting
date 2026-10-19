
const express = require('express');
const route = express.Router();
const Vote = require('../models/Vote');



route.get('/Votes', async (req, res) => {
    try {
        const data = await Vote.find();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




route.post('/Voting', async (req, res) => {
    try {
        const newVote = new Vote(req.body);
        const savedVote = await newVote.save();

        console.log('Voting Done');
        res.status(201).json(savedVote);
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(409).json({
                error: 'This user has already voted.'
            });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                error: err.message
            });
        }

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


route.get('/Vote/Counts', async (req, res) => {
    try {
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: '$voted',
                    totalVotes: { $sum: 1 }
                }
            },
            {
                $sort: {
                    totalVotes: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    party: '$_id',
                    totalVotes: 1
                }
            }
        ]);

        res.status(200).json(results);

    } catch (err) {
        console.error('Error fetching vote counts:', err);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


module.exports = route;
