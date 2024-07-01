const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   key: {
      type: String,
      required: true
   }
}, { timestamps: true })

module.exports = mongoose.model('books', bookSchema)