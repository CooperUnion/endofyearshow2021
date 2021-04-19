const express = require('express');
const router = express.Router();
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

router.get('/', (req, res, next)=>{
  
  
  res.json({ok:true})
})

router.get('/tags', wpLogger, async (req, res) => {
  const tags = await getAllCategories()  
  res.json(tags)
})

module.exports = router