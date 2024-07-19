const express = require('express');
const StudentCtrl = require('../../controller/academics/studentsCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLogin = require('../../middlewares/isTeacherLogin')
const isTeacher = require('../../middlewares/isTeacher')
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin')

const studentRoute = express.Router();

studentRoute
    .route('/exam/:id/write')
    .post(isStudentLogin,isStudent,StudentCtrl.WriteExam)


studentRoute
    .route('/:studentId/admin/update')
    .put(isLogin,isAdmin,StudentCtrl.AdminupdateStudent)
studentRoute
    .route('/admin/register')
    .post(isLogin,isAdmin,StudentCtrl.createStudentCtrl)

studentRoute
    .route('/admin/login')
    .post(StudentCtrl.loginStudentCtrl)

studentRoute
    .route('/profile')
    .get(isStudentLogin,isStudent,StudentCtrl.getStudentProfile)


studentRoute
    .route('/admin')
    .get(isLogin,isAdmin,StudentCtrl.getAllStudent_Admin)
studentRoute
    .route('/update')
    .put(isStudentLogin,isStudent,StudentCtrl.updateStudentrProfile)

studentRoute
    .route('/:id')
    .get(isLogin,isAdmin,StudentCtrl.getStudentByIdCtrl)





module.exports = studentRoute;