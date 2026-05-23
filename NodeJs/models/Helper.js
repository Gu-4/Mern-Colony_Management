const mongoose = require("mongoose");

const helperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: String,
        default: "Available"
    },
    type: {
        type: String,

    }
},
    {
        timestamps: true,
        collection: "helpers"
    }
);

const Helper = mongoose.model("Helper", helperSchema);
module.exports = Helper;