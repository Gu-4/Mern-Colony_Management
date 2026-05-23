const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true,
    },
    flat_no:{
        type:Number,
        required:true,
        unique:true
    },
    flat_type: {
        type: String,
        required: true,
    },
    floor_no: {
        type: String,
        required: true,
    },
    deposit: {
        type: String,
        required: true,
    },
    rent: {
        type: String,
        required: true,
    },
    furnish: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Available"
    }
},
    {
        collection: "flats"
    }
)
module.exports = mongoose.model('Flat', flatSchema);