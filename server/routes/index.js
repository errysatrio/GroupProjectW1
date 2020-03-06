'use strict'

const router = require('express').Router()
const routerCrypto = require('./routerCrypto')
const usersRoute = require('../routes/usersRoute')
const routerStock = require('./routerStock')
const Authentication = require("../middleware/Authentication.js");
const btcRoute = require('../routes/btcRoute')



router.use('/users', usersRoute);
router.use('/btc', Authentication, btcRoute);
router.use('/stocks', routerStock)

module.exports = router