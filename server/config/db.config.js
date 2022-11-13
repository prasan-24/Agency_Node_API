const db = require("../model/index");

const url = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await db.mongoose.connect(url).then(() => {
            console.log("Successfully connect to MongoDB.");
        }).catch(err => {
            console.error("Connection error", err);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
