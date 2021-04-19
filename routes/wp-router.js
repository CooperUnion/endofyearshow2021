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
  
  return res.json({ok: true})
  
  console.log('running test')
  let test = await wp.create()
  res.json({ok:true, test})
})

router.post('/', wpLogger, upload.none(), async (req, res, next)=>{
  console.log('creating a post')
  console.log(req.body)
  try {
    let post = await wp.create(req.body)
    res.json("ok")
  } catch (e) {
    res.status(500).json({error:e})
  }

})

router.post('/json', wpLogger, upload.none(), async (req, res, next)=>{
  console.log('creating a post')
  console.log(req.body)
  try {
    let post = await wp.create(req.body)
    res.json("ok")
  } catch (e) {
    res.status(500).json({error:e})
  }

})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

module.exports = router