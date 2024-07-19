const Subject = require('../../model/Academic/Subject')
const AsyncHandler = require('express-async-handler') 
const Program = require('../../model/Academic/Program');
const Student = require('../../model/Academic/Student');


exports.createSubjectCtrl = AsyncHandler(async (req, res) => {
    const {name,description,academicTerm} = req.body;
    if (!name || !description ) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin đối tượng'
        });
        return;
    }

    const program = await Program.findById(req.params.programID);
    if(!program){
        throw new Error('Không có chương trình học');
    }
    const a = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id
        });
   
    program.subjects.push(a._id);
    await program.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo đối tượng thành công'
    })
})

exports.getSubjectsCtrl = AsyncHandler(async (req, res) => {
    const subjects = await Subject.find();
    res.status(200).json({
        status:'success',
        length: subjects.length,
        data: subjects,
        message: 'Get all đối tượng'
    })
})

exports.getSubjectByIdCtrl = AsyncHandler(async (req, res) => {
    const subjects = await Subject.findById(req.params.id);
    if(!subjects){
        throw new Error('Đối tượng học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: subjects,
        message: 'Get đối tượng theo id'
    })
})

exports.updateSubjectsCtrl = AsyncHandler(async (req, res) => {
    const {name,description,academicTerm} = req.body;
    const newName = await Subject.findOne({name});
    if(newName){
        throw new Error('Tên đối tượng đã tồn tại');
    }
    const subjects = await Subject.findByIdAndUpdate(req.params.id, {
        name,
        description,
        academicTerm,
        updatedBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!subjects){
        throw new Error('Đối tượng  không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: subjects,
        message: 'Cập nhật đối tượng thành công'
    })
})

exports.deleteSubjectCtrl = AsyncHandler(async (req, res) => {
    const subjects = await Subject.findByIdAndDelete(req.params.id);
    if(!subjects){
        throw new Error('Đối tượng không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa đối tượng học thành công'
    })
})

