const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.year,
        userId: req.body.userId
    });
    book.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Book Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.updateBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre,
        userId: req.body.userId,
        rating: req.body.rating,
    });
    Book.updateOne({ _id: req.params.id }, book).then(
        () => {
            res.status(201).json({
                message: 'Book updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.showBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    }).then(
        (book) => {
            res.status(200).json(book);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.showallBooks = (req, res, next) => {
    Book.find().then(
        (book) => {
            res.status(200).json(book);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.bestratingBooks = (req, res, next) => {

}

exports.ratingBook = (req, res, next) => {
    const rating = new Rating({
        rating: req.body.rating
    })
}