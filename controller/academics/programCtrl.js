const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const Program = require('../../model/Academic/Program');


exports.createProgramCtrl = AsyncHandler(async (req, res) => {
    const {name,description} = req.body;
    if (!name || !description ) {
        res.status(400).json({
            status: 'fail',
            message: 'Thiếu thông tin chương trình học'
        });
        return;
    }
    const program = await Program.findOne({name});
    if(program){
        throw new Error('Chương trình học đã tồn tại');
    }
    const a = await Program.create({
        name,
        description,
        createdBy: req.userAuth._id
        });
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(a._id);
    await admin.save();
    res.status(200).json({
        status:'success',
        data: a,
        message: 'Tạo chương trình thành công'
    })
})

exports.getProgramsCtrl = AsyncHandler(async (req, res) => {
    const program = await Program.find();
    res.status(200).json({
        status:'success',
        length: program.length,
        data: program,
        message: 'Get all chương trình'
    })
})

exports.getProgramByIdCtrl = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if(!program){
        throw new Error('Chuowgn trình học không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: program,
        message: 'Get chương trình theo id'
    })
})

exports.updateProgramCtrl = AsyncHandler(async (req, res) => {
    const {name,description} = req.body;
    const newName = await Program.findOne({name});
    if(newName){
        throw new Error('Tên chương trình đã tồn tại');
    }
    const program = await Program.findByIdAndUpdate(req.params.id, {
        name,
        description,
        updatedBy: req.userAuth._id
    }, {new: true, runValidators: true});
    if(!program){
        throw new Error('Chương trình không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: program,
        message: 'Cập nhật chương trình thành công'
    })
})

exports.deleteProgramCtrl = AsyncHandler(async (req, res) => {
    const program = await Program.findByIdAndDelete(req.params.id);
    if(!program){
        throw new Error('Chuowgn trình không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: null,
        message: 'Xóa chương trình học thành công'
    })
})