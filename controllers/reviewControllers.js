const review = require('../models/review');
const book = require('../models/books');
const asyncHandler = require("express-async-handler");
const createReview = asyncHandler(async (req, res) => {
   try {

      const b = await book.findOne({ key: req.body.book_id });
      if (!b) return res.status(404).json({ message: "book with this id not found." });
      const r = new review({ ...req.body, user_id: req.user._id });
      await r.save();
      res.status(201).json(r);
   } catch (error) {
      res.status(500).json({ message: "Can not create Review." });
   }
});

const getReviews = asyncHandler(async (req, res) => {
   try {
      const { page = 1, size = 10 } = req.query;
      const r = await review.find()
         .skip((page - 1) * size)
         .limit(parseInt(size));
      res.json(r);
   } catch (error) {
      res.status(500).json({ message: "Can not get Reviews." });
   }
});

const getReview = asyncHandler(async (req, res) => {
   try {
      const r = await review.findById(req.params.id);
      if (!r) return res.status(404).json({ message: "Review not found" });
      res.json(r);
   } catch (error) {
      res.status(500).json({ message: "Can not this Reviews." });
   }
});

const updateReview = asyncHandler(async (req, res) => {
   try {
      const r = await review.findById(req.params.id);
      if (!r) return res.status(404).json({ message: "Review not found" });
      if (r.user_id.toString() !== req.user._id)
         return res.status(403).json({ message: "Unauthorized" });

      r.rating = req.body.rating;
      r.comment = req.body.comment;
      await r.save();
      res.json(r);
   } catch (error) {
      res.status(500).json({ message: "Can not update Review." });
   }
});
const deleteReview = asyncHandler(async (req, res) => {
   try {
      const r = await review.findById(req.params.id);
      if (!r) return res.status(404).json({ message: "Review not found" });
      if (r.user_id.toString() !== req.user._id.toString())
         return res.status(403).json({ message: "Unauthorized" });

      del = await review.deleteOne({ _id: req.params.id });
      if (del) {
         res.status(200).send({ message: "Review deleted successfully" });
      }

   } catch (error) {
      res.status(500).json({ message: "Can not delete Review." });
   }
});

module.exports = {
   createReview,
   getReviews,
   getReview,
   updateReview,
   deleteReview,
};