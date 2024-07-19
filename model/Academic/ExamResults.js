const mongoose = require('mongoose');

const examResultsSchema = new mongoose.Schema({
    studentID:{
        type:String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Student',
        // required: true
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    grade:{
        type:Number,
        required: true
    },
    score:{
        type: Number,
        required: true,
       
    },
    passMark:{
        type: Number,
        //required: true,
        default:50
    },
    answeredQuestions:[{
        type:Object
    }],
    status:{
        type: String,
        //required: true,
       // enum: ['failed', 'passed'],
       // default: 'failed'
    },
    remarks:{
        type: String,
        required:true,
      //  enum:['Excellent','Poor','Good'],
      //  default: 'Poor'
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        
    },
    classLevel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassLevel',
    },
    academicTerm:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicTerm',
      required: true
    },
    academicYear:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    },
    isPublished:{
        type: Boolean,
        default: false
    }



}, {
    timestamps:true
})
const ExamResult = mongoose.model('ExamResult',examResultsSchema);

module.exports = ExamResult;