const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
    },
    passMark: {
        type: Number,
    //    required: true,
       // default: 50
    },
    totalMark: {
        type: Number,
      //  required: true,
      //  default: 100
    },
    academicTerm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicTerm',
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "30 minutes"
    },
    examDate: {
        type: Date,
    },
    examTime: {
        type: String,
    },
    examType: {
        type: String,
        required: true,
      //  default: "Quiz"
    },
    examStatus: {
        type: String,
        //required: true,
       // default: "Pending",
       // enum: ['Pending', 'Live']
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    classLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassLevel',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    }
}, {
    timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
