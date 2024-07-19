const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("kết nối thành công");
    } catch (error) {
        console.log("kết nối thất bại",error.message);
        
    }
}

dbConnect();