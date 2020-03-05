'use strict'

const { User, Company, Stock } = require('../models')
const axios = require('axios')

class ControllerUser {
    static home(req, res, next) {
        let id = Number(req.params.id)
        User
            .findAll({
                include: [{
                    model: Company
                }],
                where: { id: id }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static userPage(req, res) {
        let id = Number(req.params.id)
        Company.findAll()
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static sell(req, res) { }

    static buyData(req, res) {
        let obj = {
            name: req.body.name,
            price: req.body.price,
            changes: req.body.changes
        }
        Company.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static refresh(req, res) {
        Company
            .destroy({
                where: {}
            })
            .then(() => {
                console.log('asd')
                const options = {
                    url: 'https://financialmodelingprep.com/api/v3/stock/actives',
                    method: 'GET'
                }
                return axios(options)
            })
            .then(response => {
                let id = Number(req.params.id)
                const data = response.data.mostActiveStock
                data.forEach((el, index) => {
                    el.id = index + 1
                });
                Company
                    .bulkCreate(data)
                    .then(result => {
                        res.status(201).json(data)
                    })
                    .catch(err => {
                        next(err)
                    })
            })
            .catch(err => {
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
                }, individualHooks: true
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addStocks(req, res) {
        let id = Number(req.params.id)
        let obj = {
            CompanyId: req.body.CompanyId,
            UserId: id
        }
        Stock
            .create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}
module.exports = ControllerUser