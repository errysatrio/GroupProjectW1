const bcrypt = require('bcrypt');

class Bcrypt{
    static hash(data){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data, salt);
    }
    static compare(plain, hashed){
        return bcrypt.compareSync(plain, hashed);
    }
}

module.exports = Bcrypt;