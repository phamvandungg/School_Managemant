const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const YearGroup = require('../../model/Academic/YearGroup');


exports.createYearGroupCtrl = AsyncHandler(async (req, res) => {
    const {name,description,academicYear} = req.body;
    if (!name || !description || !academicYear) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin nhóm học'
        });
        return;
    }
    const yearGroups = await YearGroup.findOne({name});
    if(yearGroups){
        throw new Error('Nhóm học đã tồn tại');
    }
    const a = await YearGroup.create({
        name,
        description,
        academicYear,
        createdBy: req.userAuth._id
        });
    const admin = await Admin.findById(req.userAuth._id);
    admin.yearGroups.push(a._id);
    await admin.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo nhóm học thành công'
    })
})

exports.getYearGroupsCtrl = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.find();
    res.status(200).json({
        status:'success',
        length: yearGroups.length,
        data: yearGroups,
        message: 'Get all nhóm học'
    })
})

exports.getYearGroupByIdCtrl = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.findById(req.params.id);
    if(!yearGroups){
        throw new Error('Nhóm học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: yearGroups,
        message: 'Get nhóm học theo id'
    })
})

exports.updateYearGroupCtrl = AsyncHandler(async (req, res) => {
    const {name,description,academicYear} = req.body;
    const newName = await YearGroup.findOne({name});
    if(newName){
        throw new Error('Tên nhóm học đã tồn tại');
    }
    const yearGroups = await YearGroup.findByIdAndUpdate(req.params.id, {
        name,
        description,
        academicYear,
        updatedBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!yearGroups){
        throw new Error('Nhóm không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: yearGroups,
        message: 'Cập nhật nhóm thành công'
    })
})

exports.deleteYearGroupCtrl = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.findByIdAndDelete(req.params.id);
    if(!yearGroups){
        throw new Error('Nhóm học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa nhóm học thành công'
    })
})