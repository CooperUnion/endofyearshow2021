const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
  getAllTags, 
  getAllCategories,
  ...wp
} = require('../lib/wp');

console.log(wp)

const student_page_limit = 100

const wpLogger = (req, res, next) =>{
  console.log('hit /auth', req.path)
  next()
}

router.get('/', wpLogger, async (req, res, next)=>{
  console.log('running test')
  let test = await wp.create()
  res.json({ok:true, test})
})

router.post('/', wpLogger, async (req, res, next)=>{
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