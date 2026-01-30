require('dotenv').config();
const mongoose =require("mongoose")

const connectDB =require("./src/config/database")
const app =require("./src/app")

connectDB();
app.listen(3000,()=>{
    console.log("listening on port 3000")
})