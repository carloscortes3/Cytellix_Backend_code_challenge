const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User_Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    authorized: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('User', User_Schema);