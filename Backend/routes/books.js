const express = require('express');
const auth = require('../middleware/auth');
const Book = require('../models/Books');
const bookCtrl = require('../controllers/books');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.get('/:id', auth, bookCtrl.showBook);
router.get('/' + '', bookCtrl.showallBooks);
// router.get('/bestrating', auth, bookCtrl.bestratingBooks);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
// router.post('/:id/rating', auth, bookCtrl.ratingBook);
router.post('/', auth, multer, bookCtrl.createBook);

module.exports = router;