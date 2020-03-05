'use strict'

const { User, Company, Stock } = require('../models')
const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const generatePass = require('../helpers/generateRandomPass')

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

    static google_login(req, res, next) {
        let { gtoken } = req.body
        let payload
        client
            .verifyIdToken({
                idToken: gtoken,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({ where: { email: payload.email } })
            })
            .then(data => {
                const { email, name } = payload
                let password = generatePass()
                if (!data) {
                    return User.create({ email, name, password })
                } else {
                    return data
                }
            })
            .then(data => {
                const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
                res.status(200).json({ token })
            })
            .catch(err => {
                console.log(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                where: {
                    email: email,
                }
            })
            .then(data => {
                const test = bcrypt.compareSync(req.body.password, data.password)
                if (test) {
                    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
                    res.status(200).json(token)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static buy(req,res,next){
        let id = Number(req.params.id)
        Stock
    }

    static sell(req, res, next) {
        let id = Number(req.params.id)
        Stock
            .destroy({ where: { id: id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerUser