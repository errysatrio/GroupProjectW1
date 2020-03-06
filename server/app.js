'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () =>console.log('listening to port', PORT))