const express = require('express');
const ClassLevel = require('../../controller/academics/lassLevelCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const lassLevelRoute = express.Router();

lassLevelRoute
    .route('/')
    .get(isLogin,isAdmin,ClassLevel.getClassLevelsCtrl)
    .post(isLogin,isAdmin,ClassLevel.createClassLevelCtrl)

lassLevelRoute
    .route('/:id')
    .get(isLogin,isAdmin,ClassLevel.getClassLevelByIdCtrl)
    .put(isLogin,isAdmin,ClassLevel.updateClassLevelCtrl)
    .delete(isLogin,isAdmin,ClassLevel.deleteClassLevelCtrl)

module.exports = lassLevelRoute;

