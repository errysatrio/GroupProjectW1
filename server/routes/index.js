'use strict'

const router = require('express').Router()
const routerUser = require('./routerUser')
const routerCrypto = require('./routerCrypto')
const routerStock = require('./routerStock')

router.use('/users',routerUser)
// router.use('/stocks',routerStock)
// router.use('/crypto',routerCrypto)

module.exports = router