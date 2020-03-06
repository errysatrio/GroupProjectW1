const express = require('express')
const router = express.Router()
const stocksController = require('../controllers/controllerStock')

router.get('/', stocksController.getStocks)

module.exports = router