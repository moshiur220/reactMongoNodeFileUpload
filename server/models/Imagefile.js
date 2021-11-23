import mongoose from "mongoose"

const image =new mongoose.Schema({
    filename:{type:String,required:true}
})


export const myimage= mongoose.model("Image",image)