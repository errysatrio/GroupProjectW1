const axios = require('axios')

async function makePriceToIDR(price){
    let options = {
        url: 'https://api.exchangeratesapi.io/latest?base=USD',
        method: 'GET'
    }
    try {
        const response = await axios(options);
        let rate = response.data.rates.IDR;
        price = rate*price;
        return price
    } catch (error) {
        return error
    }
}

module.exports = makePriceToIDR