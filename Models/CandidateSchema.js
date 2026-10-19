const mongoose = require('mongoose');

const canSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

const Candidate = new mongoose.model('Candidate', canSchema);

module.exports = Candidate;