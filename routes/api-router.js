const express = require('express');
const router = express.Router();
const Special = require('../lib/projects');
const special = new Special();

const multer = require('multer');
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })


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

router.get('/posts/:id', apiLogger, async (req, res, next)=>{
  const posts = await wp.getPostById(req.params.id)
  res.json(posts)
})

router.get('/projects', apiLogger, async (req, res, next)=>{
  return res.json(special.projects)
})

router.post('/projects', apiLogger, upload.none(), async (req, res, next)=>{
  special.projects = req.body.projectName
  return res.json(req.body.projectName)
})

module.exports = router