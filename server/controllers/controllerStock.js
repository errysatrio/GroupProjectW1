const { Company } = require('../models')
const axios = require('axios')
const makePriceToIDR = require('../helpers/makePriceToIDR')

class StockController {
    static getStocks(req, res, next){
        Company.destroy({where: {}})
        .then(result1 => {
            let options = {
                url: 'https://financialmodelingprep.com/api/v3/stock/real-time-price',
                method: 'GET'
            }
            return axios(options)
        })
        .then(data1 => {
            let number = 17
            for(let i = 0; i < number; i++){
                if (i === number-1){
                    setTimeout(()=>{
                        let options2 = {
                            url: `https://financialmodelingprep.com/api/v3/company/profile/${data1.data.stockList[i].symbol}`,
                            method: 'GET'
                        }
                        axios(options2)
                        .then(result => {
                            makePriceToIDR(result.data.profile.price)
                            .then(price => {
                                Company.create({
                                    id: i+1,
                                    name: result.data.profile.companyName,
                                    symbol: result.data.symbol,
                                    price: price,
                                    changes: result.data.profile.changesPercentage
                                })
                                .then(result2 =>{
                                    return Company.findAll()
                                })
                                .then(companies => {
                                    companies.sort((a,b) => {
                                        return a.id-b.id
                                    })
                                    res.status(200).json(companies)
                                })
                                .catch(err => {
                                    // console.log(err)
                                    throw {
                                        status: 404,
                                        msg: 'Not Found'
                                    }
                                })
                            })
                            .catch(err => {
                                // console.log(err)
                                throw {
                                    status: 404,
                                    msg: 'Not Found'
                                }
                            })
                        })
                    }, 500)
                }else{
                    let options2 = {
                        url: `https://financialmodelingprep.com/api/v3/company/profile/${data1.data.stockList[i].symbol}`,
                        method: 'GET'
                    }
                    axios(options2)
                    .then(result => {
                        makePriceToIDR(result.data.profile.price)
                        .then(price => {
                            Company.create({
                                id: i+1,
                                name: result.data.profile.companyName,
                                symbol: result.data.symbol,
                                price: price,
                                changes: result.data.profile.changesPercentage
                            })
                        })
                        .catch(err => {
                            // console.log(err)
                            throw {
                                status: 404,
                                msg: 'Not Found'
                            }
                        })
                    })
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = StockController
