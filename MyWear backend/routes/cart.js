const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getAllGoodsCart, createGoodCart, removeGoodCart, addCountGood, removeCountGood, cleanCart, getArticleCart, getAllGoodsCartByTg } = require('../controllers/cart');

router.get('/', getAllGoodsCart);
router.get('/:article', getArticleCart);
router.post('/:article', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        brand: Joi.string().min(2).max(30).required(),
        size: Joi.number().required(),
        price: Joi.number().required(),
        thumbnail: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    }),
}), createGoodCart);
router.delete('/:article', removeGoodCart);
router.delete('/', cleanCart);
router.put('/:article', addCountGood);
router.patch('/:article', removeCountGood);

module.exports = router;