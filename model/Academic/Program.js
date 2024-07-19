const mongoose = require('mongoose');
const { name } = require('../../app/app');

const programSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String
            
        },
        duration:{
            type: String,
            required: true,
            default:'4 years'
        },
        code:{
            type: String,
            default: function(){
                return (
                    this.name
                        .split(" ")
                        .map(name => name[0])
                        .join("")
                        .toUpperCase() +
                        Math.floor(10 + Math.random() * 90) +
                        Math.floor(10 + Math.random() * 90)

                )
            }
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
        teachers:[{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Teacher',
            default: []
        }],
        students:[{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Student',
            default: []
        }],
        subjects:[
            {type: [mongoose.Schema.Types.ObjectId],
            ref: 'Subject',
            default: []}
        ]


},
{
    timestamps: true
}
);

const Program = mongoose.model('Program',programSchema);

module.exports = Program;