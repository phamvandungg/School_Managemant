const express = require('express');
const Program = require('../../controller/academics/programCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')

const programRoute = express.Router();

programRoute
    .route('/')
    .get(isLogin,isAdmin,Program.getProgramsCtrl)
    .post(isLogin,isAdmin,Program.createProgramCtrl)

programRoute
    .route('/:id')
    .get(isLogin,isAdmin,Program.getProgramByIdCtrl)
    .put(isLogin,isAdmin,Program.updateProgramCtrl)
    .delete(isLogin,isAdmin,Program.deleteProgramCtrl)

module.exports = programRoute;

