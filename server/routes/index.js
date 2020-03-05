'use strict'

const router = require('express').Router()
const routerUser = require('./routerUser')
const routerCrypto = require('./routerCrypto')
const routerStock = require('./routerStock')
const authentication = require('../middlewares/authentication')

router.use('/users',routerUser)
router.use(authentication)
// router.use('/stocks',routerStock)
// router.use('/crypto',routerCrypto)

module.exports = router