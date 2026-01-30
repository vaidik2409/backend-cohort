const express =require("express")
const noteModel=require("./models/notes.model")

const app=express();

app.use(express.json())

app.post("/notes",async (req,res)=>{
    const { title, description } = req.body

    const note=await noteModel.create({
        title,
        description
    })
    res.status(210).json({
        message : "Note created",
        note
    })
})

module.exports=app;
