const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\S+@\S+\.\S+/
    },
    club: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model('playerModel', playerModel);
