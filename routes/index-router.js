const express = require('express');
const router = express.Router();
const msalAuth = require('./msal-auth');
const data = require('./data');

const indexLogger = (req, res, next) =>{
  console.log('hit /index', req.path)
  next()
}

//auth router redirects
router.get('/', msalAuth.validate, (req, res) => {
  res.redirect('/form')
});

router.get('/logout', (req, res)=>{
  res.redirect('/auth/logout')
})

router.get("/token", async (req, res) => {
  res.redirect('/form/token')
})

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

router.get('/file/:filename', (req, res)=>{
  
  res.sendFile(`${__dirname}/uploads/${req.params.filename}`)
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