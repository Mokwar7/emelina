const express = require('express');
const { getAllGoodsCartByTg } = require('../controllers/cart');
const router = express.Router();

router.use('/catalog', require('./catalog'));
router.post('/cart/tg', getAllGoodsCartByTg);

module.exports = router;
