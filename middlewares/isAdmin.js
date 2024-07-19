const Admin = require('../model/Staff/Admin');

const isAdmin = async (req, res, next) => {
    const iduser = req.userAuth._id;
    const admin = await Admin.findById(iduser);
   // console.log('Admin found:', admin); // Log giá trị để kiểm tra
    if (admin?.role === 'admin') {
        next();
    } else {
        const er = new Error('Không phải admin');
        er.status = 403; // Forbidden
        next(er);
    }
};

module.exports = isAdmin;
