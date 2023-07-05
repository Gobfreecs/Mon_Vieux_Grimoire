const sharp = require('sharp');
const fs = require('fs');

const processImage = (req, res, next) => {
    if (req.file) {
        sharp(req.file.path)
            .resize({ width: 400, height: 500, fit: sharp.fit.inside })
            .toFile('images/processed-' + req.file.filename, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Image traitée avec succès');
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error('Erreur lors de la suppression de l\'image originale', err);
                        } else {
                            console.log('Image originale supprimée');
                        }
                    });
                }
            });
    }
    next();
};

module.exports = processImage;