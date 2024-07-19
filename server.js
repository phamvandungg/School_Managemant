const app = require('./app/app');
const dotenv = require('dotenv');
require('dotenv').config();


require('./config/dbConnect')


const PORT = process.env.PORT || 8000

//server

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
