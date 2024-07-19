const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler') 
const Teacher = require('../../model/Staff/Teacher');
const healper = require('../../utils/healper')
const generateToken = require('../../utils/generateToken')


exports.createTeacherCtrl = AsyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        throw new Error('Thiếu thông tin')
    }
    const admin = await Admin.findById(id.userAuth._id);
    if(!admin){
        throw new Error('Bạn không có quyền tạo tài khoản gia sư')
    }
    const teacher = await Teacher.findOne({email})
    if(teacher){
        throw new Error('Tài khoản đã tồn tại')
    }
    const hashedPassword = await healper.hashPassword(password);
    const newTeacher = await Teacher.create({
        name,
        email,
        password: hashedPassword
    })
    admin.teachers.push(newTeacher._id);
    await admin.save();
    res.status(201).json({
        message: 'Tạo tài khoản gia sư thành công',
        data: newTeacher
    })
})

exports.loginTeacherCtrl = AsyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if (!email ||!password) {
        throw new Error('Thiếu thông tin')
    }
    const teacher = await Teacher.findOne({email})
    if(!teacher){
        throw new Error('Tài khoản không tồn tại')
    }
    const isMatch = await healper.isPassMatched(password, teacher.password)
    if(!isMatch){
        throw new Error('Sai mật khẩu')
    }
    res.json({
        message: 'Đăng nhập thành công',
        data: generateToken(teacher._id)
    })


})

exports.getTeachersCtrl = AsyncHandler(async (req, res) => {
   res.status(200).json(res.result)
})

exports.getTeacherByIdCtrl = AsyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    if(!teacher){
        throw new Error('Gia sư không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: teacher,
    })
})

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.userAuth._id);
    if(!teacher){
        throw new Error('Gia sư không tồn tại');
    }
    res.status(200).json({
        status:'success',
        data: teacher,
        message: 'Get profile gia sư'
    })
})

exports.updateTeacherProfile = AsyncHandler(async(req,res,next) => {
    const {name,email,password} = req.body;
    
    const emailExit = await Teacher.findOne({email})
    if(emailExit){
        throw new Error('Email đã tồn tại')
    }
    if(password){
       
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email,password: await healper.hashPassword(password)
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:teacher,
            message: "Update thành công"
        })  
    }else {
        const teacher =   await Teacher.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:teacher,
            message: "Update thành công"
        })  
    }    
    
})

exports.AdminupdateTeacher = AsyncHandler(async (req, res) => {
    const { program, academicYear, classLevel, subject } = req.body;

    const teacher = await Teacher.findById(req.params.teacherID);
    if (!teacher) {
        throw new Error('Gia sư không tồn tại');
    }
    if (teacher.isWithdrawn) {
        throw new Error('Tài khoản của gia sư đã bị trả lại');
    }

    let updated = false;

    if (program) {
        teacher.program = program;
        updated = true;
    }
    if (academicYear) {
        teacher.academicYear = academicYear;
        updated = true;
    }
    if (classLevel) {
        teacher.classLevel = classLevel;
        updated = true;
    }
    if (subject) {
        teacher.subject = subject;
        updated = true;
    }

    if (updated) {
        await teacher.save();
        res.status(200).json({
            status: 'success',
            data: teacher,
            message: 'Cập nhật thông tin gia sư thành công'
        });
    } else {
        res.status(400).json({
            status: 'fail',
            message: 'Không có thông tin nào được cập nhật'
        });
    }
});
