const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
},
    {
        collection: "blocks"
    }
)
module.exports=mongoose.model('Block',blockSchema);