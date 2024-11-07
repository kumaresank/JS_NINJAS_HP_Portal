const mongoose = require('mongoose');

require('dotenv').config();

console.log();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;