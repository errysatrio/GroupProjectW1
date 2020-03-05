'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controllerUser')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/google_login', Controller.google_login)

module.exports = router