const Teacher = require('../model/Staff/Teacher');

const isAdmin = async (req, res, next) => {
    const iduser = req.userAuth._id;
    const teacher = await Teacher.findById(iduser);
   // console.log('Admin found:', admin); // Log giá trị để kiểm tra
    if (teacher?.role === 'teacher') {
        next();
    } else {
        const er = new Error('Không phải teacher');
        er.status = 403; // Forbidden
        next(er);
    }
};

module.exports = isAdmin;
