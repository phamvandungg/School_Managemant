const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const ClassLevel = require('../../model/Academic/ClassLevel');


exports.createClassLevelCtrl = AsyncHandler(async (req, res) => {
    const {name,description} = req.body;
    if (!name || !description ) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin lớp học'
        });
        return;
    }
    const classLevels = await ClassLevel.findOne({name});
    if(classLevels){
        throw new Error('Lớp học đã tồn tại');
    }
    const a = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id
        });
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(a._id);
    await admin.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo lớp học thành công'
    })
})

exports.getClassLevelsCtrl = AsyncHandler(async (req, res) => {
    const classLevels = await ClassLevel.find();
    res.status(200).json({
        status:'success',
        length: classLevels.length,
        data: classLevels,
        message: 'Get all lớp học'
    })
})

exports.getClassLevelByIdCtrl = AsyncHandler(async (req, res) => {
    const classLevels = await ClassLevel.findById(req.params.id);
    if(!classLevels){
        throw new Error('Lóp học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: classLevels,
        message: 'Get lớp học theo id'
    })
})

exports.updateClassLevelCtrl = AsyncHandler(async (req, res) => {
    const {name,description} = req.body;
    const newName = await ClassLevel.findOne({name});
    if(newName){
        throw new Error('Tên lớp học đã tồn tại');
    }
    const classLevels = await ClassLevel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        updatedBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!classLevels){
        throw new Error('Lớp học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: classLevels,
        message: 'Cập nhật lớp học thành công'
    })
})

exports.deleteClassLevelCtrl = AsyncHandler(async (req, res) => {
    const classLevels = await ClassLevel.findByIdAndDelete(req.params.id);
    if(!classLevels){
        throw new Error('Lớp học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa học kì thành công'
    })
})