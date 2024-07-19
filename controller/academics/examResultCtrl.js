const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const Student = require('../../model/Academic/Student');
const Exam = require('../../model/Academic/Exam');
const ExamResult = require('../../model/Academic/ExamResults');
const healper = require('../../utils/healper')
const generateToken = require('../../utils/generateToken')


exports.CheckExamResults = AsyncHandler(async (req,res) =>{
    const student = await Student.findById(req.userAuth._id);
    if(!student){
        throw new Error('Học sinh không tồn tại');
    }
    const examResult = await ExamResult.findById({
        studentID: req.userAuth._id,
        _id: req.params.id
    }).populate({
        path: 'exam',
        populate: {
            path: 'questions',
           
        }
    })
    .populate('classLevel')
    .populate('academicTerm')
    .populate('academicYear')
    if(!examResult){
        throw new Error('Kết quả thi không tồn tại');
    }
    if(!examResult.isPublished) {
        throw new Error('Kết quả thi chưa được công bố');
    }

    res.status(200).json({
        status:'success',
        data:examResult,
        student:student,
        message: "Check Exam Results"
    })
})

exports.getAllExamsResult = AsyncHandler(async (req,res) =>{
    // ko cho xem kết quả của học sinh
    const examsResult = await ExamResult.find().select('exam').populate('exam');
    res.status(200).json({
        status:'success',
        length: examsResult.length,
        data: examsResult,
        message: 'Get all kết quả thi'
    })
})


exports.AdminpublicExamResult = AsyncHandler(async (req,res) =>{
    // ko cho xem kết quả của học sinh
    const examsResult = await ExamResult.findById(req.params.id);
    if(!examsResult){
        throw new Error('Kết quả thi không tồn tại');
    }

    const examsResultpublic = await ExamResult.findByIdAndUpdate(req.params.id,{
       isPublished : req.body.publish
    },{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status:'success',
        data: examsResultpublic,
        message: 'Công bố thành công'
    })
})