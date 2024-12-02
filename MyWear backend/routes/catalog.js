const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getAllGoods, createGood, deleteGood, getGood } = require('../controllers/catalog');

router.get('/', getAllGoods);
router.post('/', celebrate({ // use createMovie method if make post request by link "/"
  body: Joi.object().keys({ // validate data before use method
    article: Joi.number().required(),
    name: Joi.string().min(2).max(30).required(),
    brand: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(1000).required(),
    material: Joi.string().min(2).max(100).required(),
    country: Joi.string().min(2).max(30).required(),
    availble: Joi.boolean().required(),
    color: Joi.array().required(),
    image1: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    image2: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    image3: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    thumbnail: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    sizesNprices: Joi.array().required(),
    password: Joi.string().required(),
  }),
}), createGood);
router.post('/:article', deleteGood);
router.get('/:article', getGood);

module.exports = router;