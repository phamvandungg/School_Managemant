const express = require('express');
const YearGroup = require('../../controller/academics/yearGroupCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const YearGroupRoute = express.Router();

YearGroupRoute
    .route('/')
    .get(isLogin,isAdmin,YearGroup.getYearGroupsCtrl)
    .post(isLogin,isAdmin,YearGroup.createYearGroupCtrl)

YearGroupRoute
    .route('/:id')
    .get(isLogin,isAdmin,YearGroup.getYearGroupByIdCtrl)
    .put(isLogin,isAdmin,YearGroup.updateYearGroupCtrl)
    .delete(isLogin,isAdmin,YearGroup.deleteYearGroupCtrl)

module.exports = YearGroupRoute;

