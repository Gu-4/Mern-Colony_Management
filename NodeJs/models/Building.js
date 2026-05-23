const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
    building_name: {
        type: String,
        required: true,
        trim: true, 
    },
    block_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Block", 
        required: true,
    }
},
    {
        collection: "buildings"
    }
)
module.exports=mongoose.model('Building',buildingSchema);