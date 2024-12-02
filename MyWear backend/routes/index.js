const express = require('express');

const router = express.Router();

router.use('/users', require('./user')); // use all methods by use this link + need requst method (for exmp: "/usesr/:id")
router.use('/cart', require('./cart'));

module.exports = router;
