const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const  AcademicTerm = require('../../model/Academic/AcademicTerm');


exports.createAcademicTermCtrl = AsyncHandler(async (req, res) => {
    const {name,description,duration} = req.body;
    if (!name || !description || !duration) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin bắt buộc'
        });
        return;
    }
    const academicTerm = await AcademicTerm.findOne({name});
    if(academicTerm){
        throw new Error('Học kì đã tồn tại');
    }
    const a = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
         });
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(a._id);
    await admin.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo năm học thành công'
    })
})

exports.getAcademicTermsCtrl = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find();
    res.status(200).json({
        status:'success',
        length: academicTerms.length,
        data: academicTerms,
        message: 'Get all học kì'
    })
})

exports.getAcademicTermByIdCtrl = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findById(req.params.id);
    if(!academicTerm){
        throw new Error('Học kì không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: academicTerm,
        message: 'Get học kì theo id'
    })
})

exports.updateAcademicTermCtrl = AsyncHandler(async (req, res) => {
    const {name,description,duration} = req.body;
    const newName = await AcademicTerm.findOne({name});
    if(newName){
        throw new Error('Tên học kì đã tồn tại');
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id, {
        name,
        description,
        duration,
        updatedBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!academicTerm){
        throw new Error('Học kì không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: academicTerm,
        message: 'Cập nhật học kì thành công'
    })
})

exports.deleteAcademicTermCtrl = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findByIdAndDelete(req.params.id);
    if(!academicTerm){
        throw new Error('Học kì không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa học kì thành công'
    })
})