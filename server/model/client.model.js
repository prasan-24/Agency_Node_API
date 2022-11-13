const mongoose = require("mongoose");

const Client = mongoose.model(
    "Client",
    new mongoose.Schema({
        agencyId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Agency"
            }
        ],
        name:{
            type: String,
            required: true,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            maxlength: 500
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        totalBill: {
            type: Number,
            required: true
        },

    }));

module.exports = Client;