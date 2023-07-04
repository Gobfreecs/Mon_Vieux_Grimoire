const express = require('express');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/books');
const multer = require('../middleware/multer-config');
const processImage = require('../sharp/resize');

const router = express.Router();

router.get('/bestrating', bookCtrl.bestratingBooks);
router.post('/:id/rating', auth, bookCtrl.ratingBook);
router.get('/:id', bookCtrl.showBook);
router.get('/' + '', bookCtrl.showallBooks);
router.post('/', auth, multer, processImage, bookCtrl.createBook);
router.put('/:id', auth, multer, processImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);




module.exports = router;