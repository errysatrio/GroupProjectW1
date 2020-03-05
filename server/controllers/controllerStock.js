const { Company } = require('../models')
const axios = require('axios')
const makePriceToIDR = require('../helper/makePriceToIDR')

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
            let number = 15
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
                                    changes: result.data.profile.changes
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
                                    console.log(err)
                                })
                            })
                            .catch(err => {
                                console.log(err)
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
                                changes: result.data.profile.changes
                            })
                        })
                        .catch(err => {
                            console.log(err)
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