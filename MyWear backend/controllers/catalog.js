const Catalog = require('../models/catalog');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');

module.exports.getAllGoods = (req, res, next) => {
    Catalog.find()
        .then((goods) => {
            res.status(SUCCESS_CODE).send({ data: goods });
        })
        .catch(next);
};

module.exports.getGood = (req, res, next) => {
    const article = req.params.article;

    Catalog.find({ article })
        .then((goods) => {
            res.status(SUCCESS_CODE).send({ data: goods });
        })
        .catch(next);
};

module.exports.createGood = (req, res, next) => {
    const { article, name, brand, description, material, country, availble, image1, image2, image3, thumbnail, sizesNprices, color, password } = req.body; // eslint-disable-line

    if (password == 'csnd2dslif32e08v3ndsk48') {
        Catalog.create({ article, name, brand, description, material, country, availble, image1, image2, image3, thumbnail, sizesNprices, color }) // eslint-disable-line
            .then((good) => {
                res.status(CREATE_CODE).send({ data: good });
            })
            .catch((err) => {
                if (err.name === 'ValidationError' || err.name === 'CastError') {
                    next(new NotCorrectDataError('Data validation error'));
                }
                next(err);
            });
    } else {
        res.status(404).send({ data: 'Not Access' });
    }
};

module.exports.deleteGood = (req, res, next) => {
    const article = req.params.article;

    if (password == 'csnd2dslif32e08v3ndsk48') {
        Catalog.deleteOne({ article })
            .then((result) => res.send(result))
            .catch(next);
    } else {
        res.status(404).send({ data: 'Not Access' });
    }
};
