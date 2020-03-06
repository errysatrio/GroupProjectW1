const bcrypt = require('bcrypt')
const { User } = require('../models')

function authorization(req, res, next) {
    console.log(req.user.id,'============')
    User
        .findOne({ where: { id: Number(req.user.id) } })
        .then(data => {
            console.log(data,'============')
            if(data){
                if (req.user.id === data.id) {
                    // console.log('masuk', req.user.id)
                    next()
                } else {
                    throw {
                        status: 403,
                        msg: 'forbidden'
                    }
                }
            } else {
                throw {
                    status:404,
                    msg:'Not Found'
                }
            }
        })
        .catch(err=>{
            next(err)
        })

}

module.exports = authorization