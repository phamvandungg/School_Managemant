const Question = require('../../model/Academic/Questions')
const AsyncHandler = require('express-async-handler') 
const Teacher = require('../../model/Staff/Teacher');
const Exam = require('../../model/Academic/Exam');


exports.createQuestionCtrl = AsyncHandler(async (req, res) => {
    const {question,optionA,optionB,optionC,optionD,correctAnswer} = req.body;
    const exam = await Exam.findById(req.params.examId);
    if(!exam){
        throw new Error('Kì thi không tồn tại');
    }
    const questionname = await Question.findOne({question})
    if(questionname){
        throw new Error('Câu hỏi đã tồn tại');
    }
    const newQuestion = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.userAuth._id
        
    });
    exam.questions.push(newQuestion._id);
    await exam.save();
    res.status(200).json({
        status:'success',
        data: newQuestion,
        message: 'Tạo câu hỏi thành công'
    })

})

exports.getQuestionsCtrl = AsyncHandler(async (req, res) => {
    const question = await Question.find();
       
    res.status(200).json({
        status:'success',
        length: question.length,
        data: question,
        message: 'Get all câu hỏi'
    })
})

exports.getQuestionByIdCtrl = AsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    if(!question){
        throw new Error('Câu hỏi không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: question,
        message: 'Get câu hỏi theo id'
    })
})

exports.updateQuestionCtrl = AsyncHandler(async (req, res) => {
    const {question,optionA,optionB,optionC,optionD,correctAnswer} = req.body;
    const questionName = await Question.findOne({question})
    if(questionName && questionName._id.toString() !==  req.params.id){
        throw new Error('Câu hỏi đã tồn tại');
    }
    const newQuestion = await Question.findByIdAndUpdate(req.params.id,{
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.userAuth._id
        
    },{
        new:true,
    });
    if(newQuestion) {
        throw new Error('Câu hỏi ko tồn tại');
    }

    res.status(200).json({
        status:'success',
        data: newQuestion,
        message: 'Cập nhật câu hỏi thành công'
    })

})