const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt =require("jsonwebtoken")

async function registerController(req,res){
    const {username ,email,password,bio,profileImage} =req.body
    
    // const isUserExist = userModel.findOne({username})

    // if(isUserExist){
    //     return res.status(409).json({
    //         message:"Username already exists.."
    //     })
    // }

    // const isEmailExist = userModel.findOne({email})

    // if(isEmailExist){
    //     return res.status(409).json({
    //         message:"Email already exists.."
    //     })
    // }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if (isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exists.."+(
                isUserAlreadyExist.username === 
                username ? "Username already exists.." : 
                "Email already exists..")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const user = new userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    { expiresIn:"1d" })

    res.cookie("token",token)

    res.status(201).json({
        message:"User is registered successfully..",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

async function loginController(req,res){
    const {username,email,password}=req.body

    const user =await userModel.findOne({
        $or:[{
            username:username
        },
        {
            email:email
        }]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found.."
        })
    }
    const  hash=crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash === user.password
    
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password.."
        })
    }
    const token =jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    {expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully..",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}


module.exorts ={
    registerController,
    loginController
}