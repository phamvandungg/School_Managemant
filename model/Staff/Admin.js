const mongoose = require('mongoose');
const { name } = require('../../app/app');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            // enum: ['admin', 'teacher', 'student'],
            default: 'admin'
        },academicYears:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'AcademicYear'
        
        }],
        programs:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Program'
         
        }],
        academicTerms:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'AcademicTerm'
      
        }],
        yearGroups:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'YearGroup'
          
        }],
        classLevels:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ClassLevel'

        }],
        teachers:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Teacher'
        
        }],
        students:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student'
        
        }]
    },{
        timestamps: true
    }
);

const  Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;


