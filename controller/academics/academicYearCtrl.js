const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const  AcademicYear = require('../../model/Academic/AcademicYear');


exports.createAcademicYearCtrl = AsyncHandler(async (req, res) => {
    const {name,fromYear,toYear} = req.body;
    if (!name || !fromYear || !toYear) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin bắt buộc'
        });
        return;
    }
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error('Năm học đã tồn tại');
    }
    const a = await AcademicYear.create({
        name,
         fromYear,
          toYear,
        createdBy: req.userAuth._id
         });
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(a._id);
    await admin.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo năm học thành công'
    })
})

exports.getAcademicYearsCtrl = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find();
    res.status(200).json({
        status:'success',
        length: academicYears.length,
        data: academicYears,
        message: 'Get all năm học'
    })
})

exports.getAcademicYearByIdCtrl = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findById(req.params.id);
    if(!academicYear){
        throw new Error('Năm học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: academicYear,
        message: 'Get năm học theo id'
    })
})

exports.updateAcademicYearCtrl = AsyncHandler(async (req, res) => {
    const {name,fromYear,toYear,createdBy} = req.body;
    const newName = await AcademicYear.findOne({name});
    if(newName){
        throw new Error('Tên năm học đã tồn tại');
    }
    const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id, {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!academicYear){
        throw new Error('Năm học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: academicYear,
        message: 'Cập nhật năm học thành công'
    })
})

exports.deleteAcademicYearCtrl = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);
    if(!academicYear){
        throw new Error('Năm học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa năm học thành công'
    })
})