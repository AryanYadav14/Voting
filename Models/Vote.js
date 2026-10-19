const mongoose = require('mongoose');

const voter = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    voted: {
        type: String,
        required: true,
        enum: ['BJP','INC','Others']
    },
    User_ID: {
        type: String,
        required: true,
        unique: true
    }
});

const Vote = mongoose.model('Vote', voter);

module.exports = Vote;