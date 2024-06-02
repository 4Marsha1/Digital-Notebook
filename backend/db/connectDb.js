const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected to host: ${db.connection.host}`);
    } catch (error) {
        console.log(`Database connection failed with error: ${error.message}`);
    }
}

module.exports = connectDb