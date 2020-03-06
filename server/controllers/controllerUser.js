'use strict'

const { User, Company, User_Stock, Sequelize } = require('../models')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const generatePass = require('../helpers/generateRandomPass')

class ControllerUser {
    static register(req, res, next) {
        const { name, username, email, password } = req.body
        User.create({ name, username, email, password })
            .then(data => {
                const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
                res.status(200).json({ token })
            })
            .catch(err => {
                // console.log(err)
                // res.send(err)
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
                // console.log(err)
                next(err)
            })
    }

    static login(req, res, next) {
        const { username, password } = req.body;
        User
            .findOne({
                where: {
                    [Op.or]: [{ email: username }, { username: username }]
                }
            })
            .then(data => {
                const test = bcrypt.compareSync(req.body.password, data.password)
                if (test) {
                    const token = jwt.sign({ id: data.id, username: data.username }, process.env.JWT_SECRET)
                    res.status(200).json(token)
                } else {
                    throw {
                        status: 404,
                        msg: 'Not Found'
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

    static editDataUser(req, res) {
        let id = Number(req.params.id)
        let obj = {
            nama: req.body.name,
            user_name: req.body.user_name,
            password: req.body.password,
            email: req.body.email
        }
        User
            .update(obj, {
                where: {
                    id: id
                }
            })
            .then(data => {
                res.redirect(`/user/${id}`)
            })
            .catch(err => {
                // res.send(err)
                next(err)
            })
    }


    static buy(req, res, next) {
        let id = Number(req.body.id)
        let obj = {
            StockId: id,
            UserId: req.user.id,
            amount: Number(req.body.amount)
        }
        // console.log(obj)
        User_Stock
            .create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static showPorto(req, res, next) {
        let UserId = Number(req.user.id)
        User_Stock.findAll({ where: { UserId } })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        msg: 'Not Found'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getOne(req, res, next) {
        let id = req.user.id;
        console.log('masuk getone')
        User.findOne({ where: { id } })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                next(err)
            })
    }

    // static sell(req, res) {
    //     let id = Number(req.params.id)
    //     Stock
    //         .destroy({ where: { id: id } })
    //         .then(data => {
    //             res.status(200).json(data)
    //         })
    //         .catch(err => {
    //             res.send(err)
    //             // next(err)
    //         })
    // }
}

module.exports = ControllerUser