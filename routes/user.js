const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getMyInfo, updateMyName, updateMyTg } = require('../controllers/user');

router.get('/me', getMyInfo);
router.patch('/me/name', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
}), updateMyName);
router.patch('/me/tg', celebrate({
  body: Joi.object().keys({
    tg: Joi.string().min(2).max(30),
  }),
}), updateMyTg);

module.exports = router;
