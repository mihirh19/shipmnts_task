const express = require('express')
require('dotenv').config()
const connectDB = require('./db')
const getBooks = require('./webscrap/scrap')
const userRoutes = require("./routes/user");
const { notFound, errorHandler } = require("./middlewares/error");
const app = express()
connectDB()
const port = process.env.PORT || 3000


getBooks()

app.use(express.json())
app.get('/', (req, res) => {
   res.send('Hello World!')
})


app.use('/books', require('./routes/book'))
app.use('/user', userRoutes)
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})