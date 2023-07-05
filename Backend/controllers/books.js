const Book = require('../models/Books');
const processImage = require('../sharp/resize');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/processed-${req.file.filename}`
    });
    book.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = book.imageUrl.split('/images/processed-')[1];
                fs.unlink(`images/processed-${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/processed-${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: 'unauthorized request' });
            } else {
                const oldImageUrl = book.imageUrl;
                const newImageUrl = bookObject.imageUrl;


                const isImageUrlUpdated = oldImageUrl && oldImageUrl !== newImageUrl;

                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => {
                        if (isImageUrlUpdated) {
                            const filename = oldImageUrl.split('/images/processed-')[1];
                            fs.unlink(`images/processed-${filename}`, (err) => {
                                if (err) {
                                    console.error("Erreur lors de la suppression de l'ancienne image", err);
                                } else {
                                    console.log('Ancienne image supprimée');
                                }
                            });
                        }
                        res.status(200).json({ message: 'Objet modifié!' });
                    })
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

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
    Book.find().then(
        (book) => {
            book.sort(function (a, b) {
                return b.averageRating - a.averageRating;
            });

            res.status(200).json(book.slice(0, 3));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.ratingBook = (req, res, next) => {
    const { rating } = req.body;
    const bookId = req.params.id;
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    Book.findById(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            const userRating = book.ratings.find((rating) => rating.userId === req.auth.userId);
            if (userRating) {
                return res.status(400).json({ message: 'Rating already exists for this user' });
            }
            book.ratings.push({
                userId: req.auth.userId,
                grade: rating,
            });

            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = sumRatings / totalRatings;

            book.save()
                .then(() => {
                    res.status(200).json(book);
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
