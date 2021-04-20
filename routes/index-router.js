const express = require('express');
const router = express.Router();
const msalAuth = require('../lib/msal-auth');
const data = require('../lib/data');

const indexLogger = (req, res, next) =>{
  console.log('hit /index', req.path)
  next()
}

//auth router redirects
router.get('/', indexLogger, msalAuth.validate, (req, res) => {
  res.redirect('/form')
});

router.get('/logout', indexLogger, (req, res)=>{
  res.redirect('/auth/logout')
})

router.get("/token", indexLogger, async (req, res) => {
  res.redirect('/form/token')
})

//static file serving, for validating uploads
router.get('/file/:filename', indexLogger, (req, res)=>{
  res.sendFile(`${__dirname}/uploads/${req.params.filename}`)
})


//shouldn't be used
router.get('/dataTest', async (req, res)=>{
  let csvData = await data.courses()
  res.json(csvData)
})

router.get('/test', async (req, res)=>{
  const data = {}
  const renderOptions = {
    data,
    layout: false
  } 
  return res.render('smallform', renderOptions)
})

router.get('/tinytest', async (req, res)=>{
  const data = {}
  const renderOptions = {
    data,
    layout: false
  } 
  return res.render('tinyform', renderOptions)
})

router.get('/students', async (req, res)=>{
  let csvData = await data.students()
  
  res.json(csvData)
})

router.get('/teachers', async (req, res)=>{
  let csvData = await data.faculty()
  
  res.json(csvData)
})

router.get('/courses', async (req, res)=>{
  let csvData = await data.courses()
  res.json(csvData)
})


module.exports = router