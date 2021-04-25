const express = require('express');
const router = express.Router();
const {
  ...wp
} = require('../lib/wp');

const apiLogger = (req, res, next) =>{
  console.log('hit /api', req.path)
  next()
}

router.get('/posts', apiLogger, async (req, res, next)=>{
  const posts = await wp.getAllPosts()
  res.json(posts)
})

module.exports = router