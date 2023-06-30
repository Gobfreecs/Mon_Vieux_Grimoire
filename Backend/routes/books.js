const express = require('express');
const auth = require('../middleware/auth');
const Book = require('../models/Books');
const bookCtrl = require('../controllers/books');
const multer = require('../middleware/multer-config');
const router = express.Router();

// router.get('/bestrating', bookCtrl.bestratingBooks);
router.get('/:id', bookCtrl.showBook);
router.get('/' + '', bookCtrl.showallBooks);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
// router.post('/:id/rating', auth, bookCtrl.ratingBook);



module.exports = router;