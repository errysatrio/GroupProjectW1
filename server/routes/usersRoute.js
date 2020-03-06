"use strict";
const router = require('express').Router();
const { UsersController } = require("../controllers");

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

module.exports = router;