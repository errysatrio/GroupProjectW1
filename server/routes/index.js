'use strict'

const router = require('express').Router()
const usersRoute = require('../routes/usersRoute')
const routerStock = require('./routerStock')
const btcRoute = require('../routes/btcRoute')
const authentication = require('../middlewares/authentication')




router.use('/users',routerUser)
router.use(authentication)
router.use('/btc', btcRoute);
router.use('/stocks', routerStock)

module.exports = router