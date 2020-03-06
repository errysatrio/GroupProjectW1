const { User } = require("../models");
const { Bcrypt, Jwt } = require("../helpers");

class UsersController {
    static register(req, res, next) {
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        User.create({
            name,
            username,
            email,
            password,
            balance: 100000000,
            balanceBtc: 0
        }).then(user => {
            let token = Jwt.sign({id: user.id});
            res.status(200).json({
                status: 200,
                result: {
                    token,
                    balance: user.balance,
                    balanceBtc: user.balanceBtc
                }
            });
        }).catch(err => {
            res.status(403).json({
                status: 403,
                errorMessage: "Failed to register."
            });
        });
    }

    static login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ where: {email}})
        .then(user=>{
            if(user){
                if(Bcrypt.compare(password, user.password)){
                    let token = Jwt.sign({id: user.id});
                    res.status(200).json({
                        status: 200,
                        result: {
                            token,
                            balance: user.balance,
                            balanceBtc: user.balanceBtc
                        }
                    });
                }else{
                    next({
                        status: 401,
                        message: "Unauthorized"
                    });
                }
            }
            else{
                next(err);
            }
        })
        .catch(err => {
            res.status(403).json({
                status: 403,
                errorMessage: "Failed to login."
            });
        });
    }
}

module.exports = UsersController;