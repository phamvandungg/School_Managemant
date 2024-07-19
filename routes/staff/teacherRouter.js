const express = require('express');
const TeacherCtrl = require('../../controller/staff/teacherCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLogin = require('../../middlewares/isTeacherLogin')
const isTeacher = require('../../middlewares/isTeacher')
const advancedResult = require('../../middlewares/advancedResult')
const Teacher = require('../../model/Staff/Teacher')
const teacherRoute = express.Router();

teacherRoute
    .route('/:teacherID/update/admin')
    .put(isLogin,isAdmin,TeacherCtrl.AdminupdateTeacher)


teacherRoute
    .route('/profile')
    .get(isTeacherLogin,isTeacher,TeacherCtrl.getTeacherProfile)
    .put(isTeacherLogin,isTeacher,TeacherCtrl.updateTeacherProfile)

teacherRoute
    .route('/admin/register')
    .post(isLogin,isAdmin,TeacherCtrl.createTeacherCtrl)

teacherRoute
    .route('/admin')
    .get(isLogin,isAdmin,advancedResult(Teacher),TeacherCtrl.getTeachersCtrl)

teacherRoute
    .route('/login')
    .post(TeacherCtrl.loginTeacherCtrl)

teacherRoute
    .route('/:id/admin')
    .get(isLogin,isAdmin,TeacherCtrl.getTeacherByIdCtrl)





module.exports = teacherRoute;