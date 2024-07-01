const express = require('express')
const router = express.Router();
const { getBooks } = require('../controllers/bookControllers')
const { protect } = require('../middlewares/authorization')

router.get('/', protect, getBooks)
module.exports = router;   