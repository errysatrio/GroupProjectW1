const axios = require('axios');

function generatePass(){
    axios({
        url: 'https://passwordwolf.com/api',
        method: 'get'
    })
    .then(data => {
        return data.data[0].password
    }).catch(err => {
        console.log(err)
    })
}

module.exports = generatePass