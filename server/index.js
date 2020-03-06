"use strict"

const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const routes = require('./routes');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app