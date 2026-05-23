const mongoose = require("mongoose");

const connectMongoose = async () => {
    try {
        const db_name = "colony_management";
        await mongoose.connect("mongodb://127.0.0.1:27017/" + db_name);
        console.log("Mongoose Connected");
    } catch (error) {
        console.log("Mongoose Error:", error.message);
    }
};

module.exports = connectMongoose;