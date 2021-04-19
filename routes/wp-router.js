const express = require('express');
const router = express.Router();

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

const {
  getAllTags, 
  getAllCategories,
  ...wp
} = require('../lib/wp');

console.log(wp)

const student_page_limit = 100

const wpLogger = (req, res, next) =>{
  console.log('hit /wp', req.path)
  next()
}

router.get('/', wpLogger, async (req, res, next)=>{
  console.log('running test')
  let test = await wp.create()
  res.json({ok:true, test})
})

router.post('/', wpLogger, multer, async (req, res, next)=>{
  console.log('creating a post')
  console.log(req.body)
  // let post = await wp.create()
  res.json("ok")
})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

module.exports = router