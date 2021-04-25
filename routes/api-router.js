const express = require('express');
const router = express.Router();
// const cors = require('cors');

const {
  ...wp
} = require('../lib/wp');

const apiLogger = (req, res, next) =>{
  console.log('hit /api', req.path)
  next()
}

// router.use(cors())

router.get('/posts', apiLogger, async (req, res, next)=>{
  const posts = await wp.getAllPosts()
  res.json(posts)
})

module.exports = router