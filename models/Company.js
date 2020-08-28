const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Company_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    customer_quantity: {
        type: Number,
        required: true
    },
    users_quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Company', Company_Schema);