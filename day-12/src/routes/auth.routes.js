const express=require("express")
const userModel =require("../models/user.models")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const{name,email,password}=req.body

    const userPresent =await userModel.findOne({email})
    if(userPresent){
        return res.status(400).json({
            message:"email already exists"
        })
    }
    const user = await userModel.create({
        name , email , password
    })
    res.status(201).json({
        message:"User Registered ",
        user
    })

})

module.exports = authRouter