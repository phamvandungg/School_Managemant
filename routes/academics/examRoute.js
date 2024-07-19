const express = require('express');
const ExamCtrl = require('../../controller/academics/examsCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLogin = require('../../middlewares/isTeacherLogin')
const isTeacher = require('../../middlewares/isTeacher')

const ExamRoute = express.Router();

ExamRoute
    .route('/')
    .post(isTeacherLogin,isTeacher,ExamCtrl.createExamCtrl)
    .get(isTeacherLogin,isTeacher,ExamCtrl.getExamsCtrl)

ExamRoute
    .route('/:id')
    .get(isTeacherLogin,isTeacher,ExamCtrl.getExamByIdCtrl)
    .put(isTeacherLogin,isTeacher,ExamCtrl.updateExamCtrl)
module.exports = ExamRoute;

