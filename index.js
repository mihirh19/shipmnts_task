const express = require('express')
require('dotenv').config()
const connectDB = require('./db')
const getBooks = require('./webscrap/scrap')

const app = express()
connectDB()
const port = process.env.PORT || 3000


getBooks()
app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.use('/books', require('./routes/book'))
app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})