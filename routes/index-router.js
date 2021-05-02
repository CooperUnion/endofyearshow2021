const express = require('express');
const router = express.Router();
const msalAuth = require('../lib/msal-auth');
const data = require('../lib/data');
const push = require('../lib/push');
const indexLogger = (req, res, next) =>{
  console.log('hit /index', req.path)
  next()
}

//auth router redirects
router.get('/', indexLogger, msalAuth.validate, (req, res) => {  
  res.redirect(req.session.redirect || '/form')
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

//vue app instantiation
router.get('/app', indexLogger, (req, res)=>{
  const renderOptions = {
    data: [],
    layout: false
  } 
  return res.render('app', renderOptions)
})

router.get('/app/post/:id', indexLogger, (req, res)=>{
  const renderOptions = {
    data: [],
    layout: false
  } 
  return res.render('app', renderOptions)
})

//vue3 app instantiation
router.get('/app3', indexLogger, (req, res)=>{
  const renderOptions = {
    data: {
      env: process.env.VUE_ENV === 'PROD' ? '.prod' : ''
    },
    layout: false
  } 
  return res.render('app3', renderOptions)
})

router.get('/app3/post/:id', indexLogger, (req, res)=>{
  const renderOptions = {
    data: [],
    layout: false
  } 
  return res.render('app', renderOptions)
})


//shouldn't be used
router.get('/dataTest', async (req, res)=>{
  let csvData = await data.courses()
  res.json(csvData)
})

router.get('/test', async (req, res)=>{
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

router.get('/cookieRedirect/:path', async(req, res)=>{
  
  req.session.redirect = '/'+req.params.path
  res.redirect(req.session.redirect)
  
})

router.get('/push', async (req, res)=>{
  push(1234, "a new post!")
})


module.exports = router