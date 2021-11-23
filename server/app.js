import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// import multer from "multer"
import { uploadFile } from "./uploadfile/fileuploadController.js"

// database connection 
mongoose.connect("mongodb://localhost:27017",{dbName:"mycrud"})


const app=express()
app.use(express.json())
app.use(cors())



app.post("/single",uploadFile,(req,res)=>{


})

app.listen(800,()=>{
    console.log('server running');
})
