const express = require('express');
const router = express.Router();
const msalAuth = require('../lib/msal-auth');
const data = require('../lib/data');

//multer configuration
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
var upload = multer({ storage: storage })

const formLogger = (req, res, next) =>{
  console.log('hit /form', req.path)
  next()
}

router.get('/', formLogger, async (req, res)=>{
  
  let students = await data.students()
  let teachers = await data.faculty()
  let courses = await data.courses()
  
  const csvData = {
    students,
    teachers,
    courses,
    user:req.session.user || {name:{full:"mike stamm", first:"mike", last:"stamm"}, email:"mike@test.com"}
  }
  
  const renderOptions = {
    data: csvData,
    layout: false
  } 
  
  return res.render('form', renderOptions)
})

router.post('/form', formLogger, upload.any(), async(req, res)=>{

  console.log({body:req.body, files: req.files})

  req.files = req.files.map((file)=>{
    
    file.fullpath = 'https://eoys-uploader-2021.glitch.me/file/' + file.filename
    return file
    
  })
  res.json(req.files)
})

router.get("/token", formLogger, async (req, res) => {
  res.json({ token: process.env.VIMEO_ACCESS_TOKEN });
});


module.exports = router