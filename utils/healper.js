const bcrypt = require('bcrypt');

exports.hashPassword = async Password =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);
    return hash;

}

exports.isPassMatched = async (Password,hash) =>{
   return await bcrypt.compare(Password, hash);
   
}

