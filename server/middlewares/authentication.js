const { Jwt } = require("../helpers");
const {User} = require('../models');
// const User = models.User;

module.exports = (req, res, next) => {
    // console.log('masuk authentication')
    let decodedToken;
    try {
        const token = req.headers.token;
        decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken)
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
