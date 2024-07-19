const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler')
const generateToken = require('../../utils/generateToken')
const bcrypt = require('bcrypt')
const healper = require('../../utils/healper')

exports.registerCtrl = AsyncHandler(async (req,res)=>{
    const adminExists = await Admin.findOne({email: req.body.email})
    if(adminExists) {
       throw new Error('Admin đã tồn tại')
    }
    const {name, email, password} = req.body;

  
    const newadmin = await Admin.create({name, email, password: await healper.hashPassword(password)});
    res.status(200).json({
        status: 'success',
        data: newadmin,
        message: 'Tạo tài khoản thành công'

    })


})

exports.loginCtrl = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
 
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.json({ message: "Thông tin đăng nhập không phù hợp" });
      }
      const isMatch = await healper.isPassMatched(password, user.password);
      if(!isMatch) {
        return res.json({ message: "Sai mật khẩu" });
      }else{
        return res.json({ data: generateToken(user._id),
                            user,
                            message:"Login thành công" });
      }
     
  
  })
  

exports.getAdminsCtrl = AsyncHandler(async (req,res)=>{
   res.status(200).json(res.result);
})
   
exports.updateAdminProfileCtrl = AsyncHandler(async(req,res,next) => {
    const {name,email,password} = req.body;
    const  admin =  await Admin.findById(req.userAuth._id);
    const emailExit = await Admin.findOne({email})
    if(emailExit){
        throw new Error('Email đã tồn tại')
    }
    if(password){
       
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email,password: await healper.hashPassword(password)
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:admin,
            message: "Update thành công"
        })  
    }else {
        const admin =   await Admin.findByIdAndUpdate(req.userAuth._id,{
            name:name,email:email
        },
    {
        new: true,
        runValidators: true
    })
        res.status(200).json({
            status:'success',
            data:admin,
            message: "Update thành công"
        })  
    }    
    
})
 exports.getAdminProfileCtrl = AsyncHandler(async (req,res,next) =>{
    const admin = await Admin.findById(req.userAuth._id).populate('academicYears').populate('academicTerms').populate('classLevels').populate('programs');
    if(!admin){
        const err = new Error('Admin not found');
        next(err);

    }else{
        res.status(404).json({
            status: 'staus',
            data:admin,
            message:"Admin profile"
        })
    }
 })
   

 exports.deleteAdminCtrl = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "deleteAdmin"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

 
 exports.adminSuspendTeacher = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "Đình chỉ giáo viên thành công"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

  
 exports.adminunSuspendTeacher = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "Hủy đình chỉ giáo viên thành công"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

   
 exports.adminunWithdrawnTeacher = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "unWitdrawnTeacher"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

 exports.adminWithdrawnTeacher = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "WitdrawnTeacher"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

 exports.adminPublishExam = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "Xuất bản kì thi"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }

 exports.adminunPublishExam = (req,res)=>{
    try {
     res.status(200).json({
         status: 'success',
         data: "Hủy xuất bản kì thi"
     })
 
    } catch (err) {
     res.json({
         error: err.message
     })
     
    }
 }


