const express=require("express")
const userModel =require("../models/user.models")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

authRouter.post("/register",async(req,res)=>{
    const{name,email,password}=req.body

    const userPresent =await userModel.findOne({email})
    if(userPresent){
        return res.status(409).json({
            message:"email already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        name , email , password:hash
    })

    const token =jwt.sign   (
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"User Registered ",
        user,
        token
    })

})


authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user =await userModel.findOne({email})
    if(!user){
        res.status(404).json({
            message:"User Not Found.."
        })
    }
    const isPasswordMatched=user.password ===crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        res.status(401).json({
            message :"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"Login Successful",
        user,
    })
})

module.exports = authRouter