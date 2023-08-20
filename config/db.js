const mongoose = require("mongoose")
require("dotenv").config()

// MongoDB connect
const connectDB = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

module.exports = connectDB;
