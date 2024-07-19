const express = require('express');
const ExamResultCtrl = require('../../controller/academics/examResultCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLogin = require('../../middlewares/isTeacherLogin')
const isTeacher = require('../../middlewares/isTeacher')
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin')

const examResultRoute = express.Router();

examResultRoute
    .route('/')
    .get(ExamResultCtrl.getAllExamsResult)

examResultRoute
    .route('/:id/checking')
    .get(isStudentLogin,isStudent,ExamResultCtrl.CheckExamResults)


examResultRoute
    .route('/:id/public')
    .put(isLogin,isAdmin,ExamResultCtrl.AdminpublicExamResult)


module.exports = examResultRoute;