const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
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
        collection: "visitors"
    }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;