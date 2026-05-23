const { MongoClient } = require("mongodb");

const dbURI = "mongodb://localhost:27017";
const client = new MongoClient(dbURI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}
connectToDatabase().then();

const dbName = "colony_management";
let db = client.db(dbName);

module.exports = db;