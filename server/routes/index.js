const express = require('express')
const router = express.Router();
const Authentication = require("../middleware/Authentication.js");

const usersRoute = require('../routes/usersRoute')
const btcRoute = require('../routes/btcRoute')

router.use('/users', usersRoute);
router.use('/btc', Authentication, btcRoute);

module.exports = router