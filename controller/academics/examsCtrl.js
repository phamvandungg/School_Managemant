const Teacher = require('../../model/Staff/Teacher')
const AsyncHandler = require('express-async-handler') 
const Exam = require('../../model/Academic/Exam');
exports.createExamCtrl = AsyncHandler(async (req, res) => {
    const {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        academicYear
    } = req.body;

    // Kiểm tra sự tồn tại của academicTerm và academicYear
    if (!academicTerm || !academicYear) {
        return res.status(400).json({
            status: 'failed',
            message: 'Thiếu academicTerm hoặc academicYear'
        });
    }

    const teacher = await Teacher.findById(req.userAuth._id);
    if (!teacher) {
        throw new Error('Giáo viên không tồn tại');
    }

    const exam = await Exam.findOne({ name });
    if (exam) {
        throw new Error('Tên kì thi đã tồn tại');
    }

    const newExam = await Exam.create({
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        academicYear,
        createdBy: req.userAuth._id
    });

    teacher.exams.push(newExam._id);
    await teacher.save();

    res.status(200).json({
        status: 'success',
        data: newExam,
        message: 'Tạo kì thi thành công'
    });
});

exports.getExamsCtrl = AsyncHandler(async (req, res) => {
    const exams = await Exam.find().populate({
        path: 'questions',
        populate:({
            path: 'createdBy'
        
        })
       
    });
    res.status(200).json({
        status:'success',
        length: exams.length,
        data: exams,
        message: 'Get all kì thi'
    })
})

exports.getExamByIdCtrl = AsyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    if(!exam){
        throw new Error('Kì thi không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: exam,
        message: 'Get kì thi theo id'
    })
})

exports.updateExamCtrl = AsyncHandler(async (req, res) => {
    const updateData = {
        ...req.body,
        createdBy: req.userAuth._id
    };
    const newName = await Exam.findOne(req.body.name);
    if(newName && newName._id.toString()!== req.params.id){
        throw new Error('Tên kì thi đã tồn tại');
    }
    const exam = await Exam.findByIdAndUpdate(req.params.id, updateData, {new: true, runValidators: true});
    res.status(200).json({
        status:'success',
        data: exam,
        message: 'Cập nhật kì thi thành công'
    })
})