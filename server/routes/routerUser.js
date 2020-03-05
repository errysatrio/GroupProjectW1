'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controllerUser')

router.get('/users', Controller)
router.post('/users', Controller)
router.get('/users', Controller)
router.get('/users', Controller)

module.export = router