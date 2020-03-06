'use strict'

const router = require('express').Router()
const routerUser = require('../routes/routerUser')
const routerStock = require('./routerStock')
const authentication = require('../middlewares/authentication')


router.use('/users',routerUser)
router.use('/stocks', authentication, routerStock)

module.exports = router