const { Jwt } = require("../helpers");
const models = require('../models');
const User = models.User;

module.exports = (req, res, next) => {
    let decodedToken;
    try {
        const token = req.headers.authorization;
        decodedToken = Jwt.verify(token);
    } catch {
        next ({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }
    User.findOne({
        where: {
            id: decodedToken.id
        }
    })
        .then(user=>{
            if(user){
                req.user = user;
                next();
            }
            else{
                next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
        .catch(err => {
            next(err);
        });

};