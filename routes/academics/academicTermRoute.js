const express = require('express');
const AcademicTermCtrl = require('../../controller/academics/academicTermCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const academicTermRoute = express.Router();

academicTermRoute
    .route('/')
    .get(isLogin,isAdmin,AcademicTermCtrl.getAcademicTermsCtrl)
    .post(isLogin,isAdmin,AcademicTermCtrl.createAcademicTermCtrl)

academicTermRoute
    .route('/:id')
    .get(isLogin,isAdmin,AcademicTermCtrl.getAcademicTermByIdCtrl)
    .put(isLogin,isAdmin,AcademicTermCtrl.updateAcademicTermCtrl)
    .delete(isLogin,isAdmin,AcademicTermCtrl.deleteAcademicTermCtrl)

module.exports = academicTermRoute;

