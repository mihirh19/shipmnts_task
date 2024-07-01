const express = require('express')
require('dotenv').config()
const connectDB = require('./db')
const getBooks = require('./webscrap/scrap')
const userRoutes = require("./routes/user");
const { notFound, errorHandler } = require("./middlewares/error");
const app = express()
const reviews = require('./routes/review')
connectDB()
const port = process.env.PORT || 3000


getBooks()

app.use(express.json())
app.get('/', (req, res) => {
   res.send({ postmandocs: 'https://documenter.getpostman.com/view/22926184/2sA3dvjC6b' })
})


app.use('/books', require('./routes/book'))
app.use('/user', userRoutes)
app.use('/reviews', reviews)
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})