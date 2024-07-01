const axios = require('axios');
const cheerio = require('cheerio');
const bookmodel = require('../models/books')
const cron = require('node-cron');
const getBooks = async () => {

   data = await axios.get("https://openlibrary.org/trending/daily")

   let books = []
   data.data.works.map((book) => {
      books.push({
         title: book.title,
         key: book.key.slice(7),
      })
   })
   // books.map((book) => {
   //    const exists = bookmodel.findOne({ key: book.key })
   //    if (!exists) {
   //       bookmodel.create(book)
   //       console.log("Book added");
   //    }
   // })
   // bookmodel.insertMany(books)
   for (const book in books) {
      const exists = bookmodel.findOne({ key: book.key })
      if (!exists) {
         await bookmodel.create(book)
         console.log("Book added");
      }
   }
}


cron.schedule("0 8 * * *", () => {
   console.log("Running a task every minute");
   getBooks()
})

module.exports = getBooks;