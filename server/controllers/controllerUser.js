'use strict'

const { User, Company, Stock } = require('../models')
const axios = require('axios')

class ControllerUser {
    static register(req,res,next){
        const {name,username,email,password}=req.body
        User.create({name,username,email,password})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = ControllerUser