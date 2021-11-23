// const upload = require("../middleware/fileUpload");

import upload from "./upload.js"
import fs from "fs"
import { myimage } from "../models/Imagefile.js";
const imageData=[]
const URL = "http://localhost:8888/get-cfiles/";
// const fs = require("fs");


const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    if (req.files.length === 0) {
      return res.status(400).send({ message: "Choose a file to upload" });
    }

    req.files.forEach(image=>{
      let img ={filename:image.filename}
      imageData.push(img)
    })
    // image save in database
    // const newImage=new myimage(imageData)
    try {
     const respond= await myimage.insertMany(imageData)
     imageData=[]
     return res.status(200).send(respond);
    } catch (error) {
      return res.status(400).send({ message: "Data not save" });
      console.log(error);
    }
// console.log(req.files);
    
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size should be less than 5MB",
      });
    }

    res.status(500).send({
      message: `Error occured: ${err}`,
    });
  }
};

const getFilesList = (req, res) => {
  const path = __basedir + "/uploads";

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: URL + file,
      });
    });

    res.status(200).send(filesList);
  });
};

const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = __basedir + "/uploads";
  
    res.download(path + fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "File can not be downloaded: " + err,
        });
      }
    });
};

export  { uploadFile, downloadFiles, getFilesList };