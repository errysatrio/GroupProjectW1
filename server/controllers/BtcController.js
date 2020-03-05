const axios = require("axios");
const { User } = require("../models");

class BtcController {
    static getRate(req, res, next) {
        axios.get("https://blockchain.info/ticker")
            .then(response => {
                const data = response.data;
                res.status(200).json({
                    currency: "IDR",
                    buy: data.USD.buy * 14300,
                    sell: data.USD.sell * 14300
                });
            })
            .catch(error => {
                next(error);
            });
    }
    static buy(req, res, next) {
        const user = req.user;
        const btc = parseFloat(req.body.btc);
        axios.get("https://blockchain.info/ticker")
            .then(response => {
                const data = response.data;
                const price = data.USD.sell * 14300;
                user.balance -= Math.round(btc*price);
                user.balanceBtc = parseFloat(user.balanceBtc) + btc;
                return user.save();
            })
            .then(user => {
                res.status(201).json({
                    status: 201,
                    result: {
                        balance: user.balance,
                        balanceBtc: user.balanceBtc
                    }
                });
            })
            .catch(next);
    }
    static sell(req, res, next) {
        const user = req.user;
        const btc = parseFloat(req.body.btc);
        axios.get("https://blockchain.info/ticker")
            .then(response => {
                const data = response.data;
                const price = data.USD.buy * 14300;
                user.balance += Math.round(btc*price);
                user.balanceBtc = parseFloat(user.balanceBtc) - btc;
                return user.save();
            })
            .then(user => {
                res.status(201).json({
                    status: 201,
                    result: {
                        balance: user.balance,
                        balanceBtc: user.balanceBtc
                    }
                });
            })
            .catch(next);
    }
}

module.exports = BtcController;