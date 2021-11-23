import express from "express"
import cors from "cors"
import multer from "multer"
const app=express()
app.use(express.json())
app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage }).array('file')

app.post("/single",(req,res)=>{

    upload(req,res,err=>{
        if(err) return res.send("File is not upload")

        console.log(req.file);
        // console.log('work');
        return res.status(200).send(req.files)
    })
    // console.log(Array.from(req.file));
    console.log('work');
    // res.send(req.file)
})

app.listen(800,()=>{
    console.log('server running');
})