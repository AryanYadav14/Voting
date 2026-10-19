const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aadharNum: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: voter
    }
});

const User = mongoose.model('User', personSchema);

module.exports = User;