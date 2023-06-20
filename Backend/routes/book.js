const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book');

router.post('/', bookCtrl.createBook);

router.get('/:id', bookCtrl.showBook);

router.put('/:id', bookCtrl.updateBook);

router.delete('/:id', bookCtrl.deleteBook);

router.get('/' + '', bookCtrl.showallBooks);

router.get('/bestrating', bookCtrl.bestratingBooks);

router.post('/:id/rating', bookCtrl.ratingBook);

module.exports = router;