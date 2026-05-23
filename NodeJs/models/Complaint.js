const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        default: "Open"
    },
    helper_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Helper"
    },
    flat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flat",
        required: true,
    },
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    }
},
    {
        timestamps: true,
        collection: "complaints"
    }
)
module.exports = mongoose.model('Complaint', complaintSchema);