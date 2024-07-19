const Student = require('../model/Academic/Student');

const isAdmin = async (req, res, next) => {
    const iduser = req.userAuth._id;
    const student = await Student.findById(iduser);
   // console.log('Admin found:', admin); // Log giá trị để kiểm tra
    if (student?.role === 'student') {
        next();
    } else {
        const er = new Error('Không phải student');
        er.status = 403; // Forbidden
        next(er);
    }
};

module.exports = isAdmin;
