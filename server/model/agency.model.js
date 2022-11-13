const mongoose = require("mongoose");

const Agency = mongoose.model(
    "Agency",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            maxlength: 32
        },
        addressOne: {
            type: String,
            required: true,
            maxlength: 500
        },
        addressTwo: {
            type: String,
            required: false,
            maxlength: 500
        },
        state: {
            type: String,
            required: true,
            maxlength: 20
        },
        city: {
            type: String,
            required: true,
            maxlength: 20
        },
        phoneNumber: {
            type: Number,
            required: true
        },

    }));

module.exports = Agency;