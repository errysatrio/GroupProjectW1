'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/google_login', Controller.google_login)
// router.use(authentication)
// router.use(authorization)
router.get('/',authentication, authorization,Controller.getOne)
router.post('/stocks', authentication, authorization, Controller.buy)
router.get('/stocks', authentication, authorization, Controller.showPorto)


module.exports = router

/*
Header:
{

}
*/