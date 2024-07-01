const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {

   mongoose.connect(mongoURI)
}

module.exports = connectDB;