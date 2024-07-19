const express = require('express');
const morgan = require('morgan');
const adminRoute = require('../routes/staff/adminRoute')
const Err = require('../middlewares/globalErrHandler')
const AcademicYearRoute = require('../routes/academics/academicYearRoute')
const AcademicTermRoute = require('../routes/academics/academicTermRoute')
const ClassLevelRoute = require('../routes/academics/classLevelRoute')
const ProgramRoute = require('../routes/academics/proGramRoute')
const SubjectRoute = require('../routes/academics/subjectRoute')
const YearGroupRoute = require('../routes/academics/yearGroupRoute')
const TeacherRoute = require('../routes/staff/teacherRouter')
const ExamRoute = require('../routes/academics/examRoute')
const StudentRoute = require('../routes/academics/studentRoute')
const QuestionRoute = require('../routes/academics/questionRoute')
const ExamResultRoute = require('../routes/academics/examResultRoute')

const app = express();
// Middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/admins',adminRoute)
app.use('/api/v1/academic-years',AcademicYearRoute)
app.use('/api/v1/academic-terms',AcademicTermRoute)
app.use('/api/v1/class-levels',ClassLevelRoute)
app.use('/api/v1/programs',ProgramRoute)
app.use('/api/v1/subjects',SubjectRoute)
app.use('/api/v1/year-groups',YearGroupRoute)
app.use('/api/v1/teachers',TeacherRoute)
app.use('/api/v1/exams',ExamRoute)
app.use('/api/v1/students',StudentRoute)
app.use('/api/v1/questions',QuestionRoute)
app.use('/api/v1/exam-results',ExamResultRoute)



//err middle
app.use(Err.notFountErr)
app.use(Err.globalErr)

module.exports = app;