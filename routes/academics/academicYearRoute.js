const express = require('express');
const AcademicYearCtrl = require('../../controller/academics/academicYearCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const academicYearRoute = express.Router();

academicYearRoute
    .route('/')
    .get(isLogin,isAdmin,AcademicYearCtrl.getAcademicYearsCtrl)
    .post(isLogin,isAdmin,AcademicYearCtrl.createAcademicYearCtrl)

academicYearRoute
    .route('/:id')
    .get(isLogin,isAdmin,AcademicYearCtrl.getAcademicYearByIdCtrl)
    .put(isLogin,isAdmin,AcademicYearCtrl.updateAcademicYearCtrl)
    .delete(isLogin,isAdmin,AcademicYearCtrl.deleteAcademicYearCtrl)

module.exports = academicYearRoute;

