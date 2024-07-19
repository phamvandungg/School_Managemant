const mongoose = require('mongoose');

const ClassLevelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
      
    },
    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          
        }
    ],
    subjects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
        }
    ],
    teachers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
        }
    ]

},{
    timestamps: true
})

const ClassLevel = mongoose.model('ClassLevel',ClassLevelSchema);

module.exports = ClassLevel;