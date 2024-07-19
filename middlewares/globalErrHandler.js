exports.globalErr = (err,req,res,next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status:"failed";
    const statusCode = err.statusCode? err.statusCode: 500 
    res.status(statusCode).json({
        status,
        message,
        stack
    })
}

exports.notFountErr = (req,res,next) =>{
    const err = new Error(`Không tìm thấy đường đẫn ${req.originalUrl}`);
    next(err);
}

