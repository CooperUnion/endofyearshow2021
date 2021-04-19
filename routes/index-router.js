const express = require('express');
const router = express.Router();
const msalAuth = require('./msal-auth');
const data = require('./data');

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

const indexLogger = (req, res, next) =>{
  console.log('hit /index', req.path)
  next()
}


router.get('/', async (req, res)=>{
  
  let students = await data.students()
  let teachers = await data.faculty()
  let courses = await data.courses()

  const csvData = {
    students,
    teachers,
    courses,
    user:req.session.user || {name:"mike", email:"mike@test.com"}
  }
  
  const renderOptions = {
    data: csvData,
    layout: false
  } 
  
  return res.render('form', renderOptions)
})

router.post('/form', upload.any(), async(req, res)=>{

  console.log({body:req.body, files: req.files})

  req.files = req.files.map((file)=>{
    
    file.fullpath = 'https://eoys-uploader-2021.glitch.me/file/' + file.filename
    return file
    
  })
  res.json(req.files)
})

router.get("/token", async (req, res) => {
  res.json({ token: process.env.VIMEO_ACCESS_TOKEN });
});


module.exports = router