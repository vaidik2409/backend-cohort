const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"Post is required to create a like.."]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User is required to create a like.."]
    }
},{
    timestamps:true
})  

likeSchema.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model("like",likeSchema)

module.exports = likeModel;