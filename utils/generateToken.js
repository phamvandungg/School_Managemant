const jwt = require('jsonwebtoken')

const generateToekn = (id) =>{
    return jwt.sign({ id }, "anykey", { expiresIn: '5h' });
}

module.exports =  generateToekn;