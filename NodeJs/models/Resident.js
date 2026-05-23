const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
    flat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flat",
        required: true
    },
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
    password: {
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now
    },
    status: {
        type: String, default: "Active"
    },
    flat: {
        type: String, default: null
    },
    payment_status: {
        type: String,
        enum: [null, "Pending", "Paid"],
        default: null
    },
    payment_id: {
        type: String,
        default: null
    }
},
    {
        timestamps: true,
        collection: "residents"
    }
);

const Resident = mongoose.model("Resident", residentSchema);
module.exports = Resident;