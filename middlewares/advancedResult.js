

const advancedResult =(model,populate) =>{
    return async(req,res,next)=>{
        const page = Number(req.params.page) || 1;
        const limit = Number(req.params.limit) || 10;
        const skip = (page - 1) * limit;
    
        const tatol = await model.countDocuments();
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

     
    
        const pagination = {};
        if(endIndex < tatol) {
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }
    
        let TeacherQuyery = model.find();
        if(populate) {
            TeacherQuyerydel = TeacherQuyery.populate(populate);
        }
        if(req.query.name){
            TeacherQuyery = TeacherQuyery.find({name: {$regex: req.query.name, $options: 'i'}});
        }
        const teachers = await TeacherQuyery.find().skip(skip).limit(limit);
      
        res.result = {
            tatol: tatol,
            pagination,
            length: teachers.length,
            data: teachers,
            message: 'Get all gia sư'
        }
        next();
    }
}

module.exports = advancedResult;