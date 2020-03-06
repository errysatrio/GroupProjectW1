"use strict";
const router = require('express').Router();
const { BtcController } = require("../controllers");

router.get('/rate', BtcController.getRate);
router.post('/buy', BtcController.buy);
router.post('/sell', BtcController.sell);

module.exports = router;