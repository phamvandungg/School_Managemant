const express = require('express');
const Subject = require('../../controller/academics/subjectsCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const subjectsRoute = express.Router();

subjectsRoute
    .route('/')
    .get(isLogin,isAdmin,Subject.getSubjectsCtrl)
subjectsRoute
    .route('/:programID')
    .post(isLogin,isAdmin,Subject.createSubjectCtrl)

subjectsRoute
    .route('/:id')
    .get(isLogin,isAdmin,Subject.getSubjectByIdCtrl)
    .put(isLogin,isAdmin,Subject.updateSubjectsCtrl)
    .delete(isLogin,isAdmin,Subject.deleteSubjectCtrl)

module.exports = subjectsRoute;

