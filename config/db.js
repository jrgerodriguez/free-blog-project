const mongoose = require("mongoose")

const connectDB = async () => {

    try {
        const connection = mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected")
    } catch (error) {
        console.error("Connection to database failed:", error.message)
    }

}

module.exports = connectDB