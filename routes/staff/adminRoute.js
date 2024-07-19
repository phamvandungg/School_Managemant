const express = require('express');
const adminRoute = express.Router();
const adminCtrl = require('../../controller/staff/adminCtrl')
const isLogin = require('../../middlewares/isLogin')
const isAdmin = require('../../middlewares/isAdmin')
const advancedResult = require('../../middlewares/advancedResult')
const Admin = require('../../model/Staff/Admin')
adminRoute
    .put('/suspend/teacher/:id',adminCtrl.adminSuspendTeacher)

adminRoute
    .put('/unsuspend/teacher/:id',adminCtrl.adminunSuspendTeacher)

adminRoute
    .put('/unsuspend/teacher/:id',adminCtrl.adminunSuspendTeacher)
adminRoute
    .put('/withdrawn/teacher/:id',adminCtrl.adminWithdrawnTeacher)
adminRoute
    .put('/unwithdrawn/teacher/:id',adminCtrl.adminunWithdrawnTeacher)  
adminRoute
    .put('/publish/exam/:id',adminCtrl.adminPublishExam)
adminRoute
    .put('/unpublish/exam/:id',adminCtrl.adminunPublishExam)

adminRoute
    .route('/register')
    .post(adminCtrl.registerCtrl)

adminRoute
    .route('/login')
    .post(adminCtrl.loginCtrl)

adminRoute
    .route('/')
    .get(isLogin,isAdmin,advancedResult(Admin),adminCtrl.getAdminsCtrl)

adminRoute
    .route('/profile')
    .get(isLogin,isAdmin, adminCtrl.getAdminProfileCtrl)
    .put(isLogin,isAdmin,adminCtrl.updateAdminProfileCtrl);

adminRoute
    .route('/:id')
    .delete(adminCtrl.deleteAdminCtrl)

module.exports = adminRoute;
