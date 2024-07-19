const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const Student = require('../../model/Academic/Student');
const Exam = require('../../model/Academic/Exam');
const ExamResult = require('../../model/Academic/ExamResults');
const healper = require('../../utils/healper')
const generateToken = require('../../utils/generateToken')


exports.createStudentCtrl = AsyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        throw new Error('Thiếu thông tin học sinh')
    }
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error('Bạn không có quyền truy cập')
    }
    const student = await Student.findOne({email})
    if(student){
        throw new Error('Tài khoản đã tồn tại')
    }
    const hashedPassword = await healper.hashPassword(password);
    const newStudent = await Student.create({
        name,
        email,
        password: hashedPassword
    })
    admin.students.push(newStudent._id);
    await admin.save();
    res.status(201).json({
        message: 'Tạo tài khoản học sinh thành công',
        data: newStudent
    })
})

exports.loginStudentCtrl = AsyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if (!email ||!password) {
        throw new Error('Thiếu thông tin đăng nhập')
    }
    const student = await Student.findOne({email})
    if(!student){
        throw new Error('Tài khoản không tồn tại')
    }
    const isMatch = await healper.isPassMatched(password, student.password)
    if(!isMatch){
        throw new Error('Sai mật khẩu')
    }
    res.json({
        message: 'Đăng nhập thành công',
        data: generateToken(student._id)
    })


})

exports.getStudentProfile = AsyncHandler(async (req, res) => {
    const student = await Student.findById(req.userAuth._id)
    .populate('examResults');
    if(!student){
        throw new Error('Học sinh không tồn tại');
    }
    //get the student
    const studentProfile = {
        name: student.name,
        email: student.email,
        currentClassLevel: student.currentClassLevel,
        program: student.program,
        studentId: student.studentId,
        dateAdmitted: student.dateAdmitted,
        isWithdrawn: student.isWithdrawn,
        isSuspended: student.isSuspended,
        prefectName: student.prefectName
    }
    // lấy bài thi gần nhất
    const examResult = student.examResults;
    const currentExamResult = examResult[examResult.length - 1];
    const isPublished = currentExamResult.isPublished;
  
    //console.log(isPublished);
    res.status(200).json({
        status:'success',
        data: {
           // student,
           studentProfile,
            currentExamResult: isPublished?currentExamResult:null,
        },
        message: 'Get profile học sinh'
    })
})

exports.getAllStudent_Admin = AsyncHandler(async (req, res) => {
    const allStudent = await Student.find();
    res.status(200).json({
        status:'success',
        length:allStudent.length,
        data: allStudent,
        message: 'Get all students'
    })
})

exports.getStudentByIdCtrl = AsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student){
        throw new Error('Học sinh không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: student,
        message: 'Get student by id'
    })
})

exports.updateStudentrProfile = AsyncHandler(async(req,res,next) => {
    const {name,email,password} = req.body;
    
    const emailExit = await Student.findOne({email})
    if(emailExit){
        throw new Error('Email đã tồn tại')
    }
    if(password){
       
        const student = await Student.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email,password: await healper.hashPassword(password)
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:student,
            message: "Update thành công"
        })  
    }else {
        const student =   await Student.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:student,
            message: "Update thành công"
        })  
    }    
    
})
exports.AdminupdateStudent = AsyncHandler(async (req,res)=>{
    const {classLevels,academicYear,program,name,email,prefectName,isSuspended,isWithdrawn} = req.body;

    const student = await Student.findById(req.params.studentId);
    if (!student) {
        throw new Error('Học sinh không tồn tại');
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId,{
        $set:{
            classLevels,
            academicYear,
            program,
            name,
            email,
            prefectName,
            isSuspended,isWithdrawn
        },
        // thêm giá trị vào mảng ko bị trùng lặp
        $addToSet:{
            classLevels
        }

    },
{
    new: true,
    runValidators: true
})
    res.status(200).json({
        status:'success',
        data: updatedStudent,
        message: 'Update thành công'
    })

})


// học trinh làm bài thi
exports.WriteExam = AsyncHandler(async (req, res) => {
    const student = await Student.findById(req.userAuth.id);
    if (!student) {
        throw new Error('Học sinh không tồn tại');
    }
    if(student.isWithdrawn  || student.isSuspended) {
        throw new Error('Học sinh đã r��i khoản hoặc đã bị đình chỉ');
    }
    const exam = await Exam.findById(req.params.id).populate("questions");
    if (!exam) {
        throw new Error('Kì thi không tồn tại');
    }
    const questions = exam.questions;
    const answers = req.body.answers;

    if (!answers || answers.length !== questions.length) {
        throw new Error('Vui lòng trả lời tất cả, trước khi nộp bài');
    }

    const studentsExam = await ExamResult.findOne({ student: student._id, exam: exam._id });
    if (studentsExam) {
        throw new Error('Bạn đã nộp bài rồi');
    }

    // Chấm điểm
    let correctAnswer = 0;
    let score = 0;
    let wrongAnswer = 0;
    let AnswerQuestion = [];

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (answers[i] === question.correctAnswer) {
            correctAnswer++;
            score++;
            question.isCorrect = true;
        } else {
            wrongAnswer++;
        }
    }

    const grade = (correctAnswer / questions.length) * 100;

    AnswerQuestion = questions.map(question => {
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            isCorrect: question.isCorrect
        };
    });

    let status = grade >= 50 ? "Đậu" : "Rớt";

    let remarks = 'kém';
    if (grade > 90) {
        remarks = 'giỏi';
    } else if (grade > 80) {
        remarks = 'khá';
    } else if (grade > 50) {
        remarks = 'trung bình';
    }

    // Thêm dữ liệu vào
    const examResult = await ExamResult.create({
        studentID: student._id,
        exam: exam._id,
        grade,
        score,
        status,
        remarks,
        classLevel: exam.classLevel,
        academicTerm: exam.academicTerm,
        academicYear: exam.academicYear,
        answeredQuestions:AnswerQuestion
    });

    // Thêm khóa vào student
    student.examResults.push(examResult._id);
    await student.save();

    //promoting
    // if(exam.academicTerm.name === "3rd term" && 
    //     status === "đậu" &&
    //     student.currentClassLevel === "Level 100"
    // ){
    //     student.classLevels.push("Level 200");
    //     student.currentClassLevel = "Level 200";
    //     await student.save();
    //     console.log("promoting student");
    // }
    // làm thêm nhiều các để nâng level, cần nhập đúng dữ liệu mới bậc này được
    //đủ level thì cho tốt nghiệm isGraduaed = true, year:Date.now() này tốt nhiệp

    res.status(200).json({
        status: 'success',
        message: 'Làm bài thi thành công'
    });
});
