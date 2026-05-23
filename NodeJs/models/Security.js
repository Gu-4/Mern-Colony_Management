const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number
    },
    pan: {
        type: String
    },
    aadhaar: {
        type: Number
    },
    address:{
        type:String,
        required:true
    },
    password: {
        type: String, required: true
    },
    status: {
        type: String, default: "Active"
    },
    createdAt: {
        type: Date, default: Date.now
    },
},
    {
        collection: "guards"
    }
);

const Security = mongoose.model("Security", securitySchema);
module.exports = Security;