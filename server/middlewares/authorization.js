const bcrypt = require('bcrypt')
const { Todo } = require('../models')

function authorization(req, res, next) {
    Todo
        .findOne({ where: { id: Number(req.params.id) } })
        .then(data => {
            if(data){
                if (req.user.id === data.UserId) {
                    // console.log('masuk', req.user.id)
                    console.log(data.UserId,'============')
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