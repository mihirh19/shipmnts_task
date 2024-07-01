const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
   book_id: {
      type: String,
      required: true
   },
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   rating: {
      type: Number,
      required: true
   }
}, { timestamps: true })



module.exports = mongoose.model('reviews', reviewSchema)