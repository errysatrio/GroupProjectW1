require('dotenv').config();
const jwt = require("jsonwebtoken");

class Jwt{
    static sign(email){
        return jwt.sign(email, process.env.JWT_SECRET);
    }
    static verify(token){
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = Jwt;