const express = require('express');
const QuestionCtrl = require('../../controller/academics/questionCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLogin = require('../../middlewares/isTeacherLogin')
const isTeacher = require('../../middlewares/isTeacher')
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin')

const questionRoute = express.Router();



questionRoute
    .route('/')
    .get(isTeacherLogin,isTeacher,QuestionCtrl.getQuestionsCtrl)
questionRoute
    .route('/:examId')
    .post(isTeacherLogin,isTeacher,QuestionCtrl.createQuestionCtrl)
questionRoute
    .route('/:id')
    .get(isTeacherLogin,isTeacher,QuestionCtrl.getQuestionByIdCtrl)
    .put(isTeacherLogin,isTeacher,QuestionCtrl.updateQuestionCtrl)


module.exports = questionRoute;