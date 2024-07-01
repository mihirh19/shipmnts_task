const Book = require("../models/books");

const getBooks = async (req, res) => {
   const { page = 1, size = 10 } = req.query;
   const books = await Book.find()
      .skip((page - 1) * size)
      .limit(parseInt(size));
   res.json(books);
};

module.exports = { getBooks };