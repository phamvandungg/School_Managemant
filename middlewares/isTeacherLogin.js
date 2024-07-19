const verifyToken = require('../utils/verifyToken');
const Teacher = require('../model/Staff/Teacher');

const isLogin = async (req, res, next) => {
    const headerObj = req.headers;
    const authorizationHeader = headerObj.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        const err = new Error('Không thấy token');
        err.status = 401; // Unauthorized
        return next(err);
    }
    const token = headerObj.authorization.split(" ")[1];

    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
        const teacher = await Teacher.findById(verifiedToken.id).select('name email role');
        if (!teacher) {
            const err = new Error('Tear trong midwe không tồn tại');
            err.status = 404; // Not Found
            return next(err);
        }
        req.userAuth = teacher;
       // console.log('User authenticated:', req.userAuth); 
        next();
    } else {
        const err = new Error('Không có token hợp lệ');
        err.status = 401; // Unauthorized
        next(err);
    }
};

module.exports = isLogin;
