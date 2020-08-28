const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Session_Schema = mongoose.Schema({
    session: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Session', Session_Schema);