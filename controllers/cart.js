const Cart = require('../models/cart');
const User = require('../models/user');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllGoodsCart = (req, res, next) => {
    console.log(req.user)

    Cart.find({ owner: req.user._id })
        .then((goods) => {
            res.status(SUCCESS_CODE).send({ data: goods });
        })
        .catch(next);
};

module.exports.getAllGoodsCartByTg = (req, res, next) => {
    const { tg } = req.body;

    User.findOne({ tg: tg })
        .then((user) => {
            Cart.find({ owner: user._id })
                .then((goods) => {
                    res.status(SUCCESS_CODE).send({ data: goods });
                })
                .catch(next);
        })
        .catch(next);
};

module.exports.getArticleCart = (req, res, next) => {
    const { article } = req.params
    Cart.find({ article, owner: req.user._id })
        .orFail(() => new NotFindError('Good is not found'))
        .then((goods) => {
            res.status(SUCCESS_CODE).send({ data: goods });
        })
        .catch(next);
};

module.exports.createGoodCart = (req, res, next) => {
    const { article } = req.params; // eslint-disable-line
    const { size, price, brand, name, thumbnail } = req.body; // eslint-disable-line

    Cart.create({ article, owner: req.user._id, size, price, brand, name, thumbnail }) // eslint-disable-line
        .then((good) => {
            res.status(CREATE_CODE).send({ data: good });
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new NotCorrectDataError('Data validation error'));
            }
            if (err.code === 11000) {
                console.log(err)
                next(new NotUniqError('Данный артикул уже в корзине'));
            }
            next(err);
        });
};

module.exports.removeGoodCart = (req, res, next) => {
    const { article } = req.params; // eslint-disable-line

    Cart.findOneAndDelete({ article, owner: req.user._id }) // eslint-disable-line
        .then((good) => {
            res.status(CREATE_CODE).send({ data: good });
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new NotCorrectDataError('Data validation error'));
            }
            next(err);
        });
};

module.exports.cleanCart = (req, res, next) => {
    Cart.deleteMany({ owner: req.user._id }) // eslint-disable-line
        .orFail(() => new NotFindError('Good is not found'))
        .then((good) => {
            res.status(CREATE_CODE).send({ data: good });
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new NotCorrectDataError('Data validation error'));
            }
            next(err);
        });
};

module.exports.addCountGood = (req, res, next) => {
    const { article, size } = req.body; // eslint-disable-line
    console.log(article)
    console.log(size)
    Cart.findOne({ article, size, owner: req.user._id }) // eslint-disable-line
        .orFail(() => new NotFindError('Good is not found'))
        .then((good) => {
            Cart.findOneAndUpdate(good, { count: good.count + 1 })
                .then((result) => res.send(result))
                .catch(next);
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new NotCorrectDataError('Data validation error'));
            }
            next(err);
        });
};

module.exports.removeCountGood = (req, res, next) => {
    const { article } = req.params; // eslint-disable-line
    Cart.findOne({ article, owner: req.user._id }) // eslint-disable-line
        .orFail(() => new NotFindError('Movie is not found'))
        .then((good) => {
            Cart.findOneAndUpdate(good, { count: good.count - 1 })
                .then((result) => res.send(result))
                .catch(next);
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new NotCorrectDataError('Data validation error'));
            }
            next(err);
        });
};