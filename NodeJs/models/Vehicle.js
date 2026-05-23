const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    vehicle_no: {
        type: String,
        required: true,
        unique:true,

    },
    model: {
        type: String,
        required: true
    },
    parking_no: {
        type: String,
        default: "Not Assigned"
    }
},
    {
        collection: "vehicles"
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;