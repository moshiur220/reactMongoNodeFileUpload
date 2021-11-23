import express from "express"
import cors from "cors"
// import multer from "multer"
import { uploadFile } from "./uploadfile/fileuploadController.js"

const app=express()
app.use(express.json())
app.use(cors())

app.post("/single",uploadFile,(req,res)=>{


})

app.listen(800,()=>{
    console.log('server running');
})