const mongoose = require("mongoose") 

const connectDB = async () =>{
    const url = "mongodb://localhost:27017/movieStore"; 

    try {
        await mongoose.connect(url, {
        })
        console.log("Connected to MongoDB");

    } catch (error) {
         console.error(`Something went wrong: ${error}`);
    }
}

module.exports = connectDB;