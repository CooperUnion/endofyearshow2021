const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const msalAuth = require('./routes/msal-auth');
const fetch = require('node-fetch');
const exphbs  = require('express-handlebars');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage })


// const data = require('./routes/data');


app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');


app.use(cookieSession({
  name: 'auth',
  keys: [process.env.COOKIE_KEY],
  maxAge: 168 * 60 * 60 * 1000, // 24*7 hours
}))

app.use(express.static("public"));

app.get('/', msalAuth.validate, (req, res) => {
  
  res.json(req.session.user)
});

app.get('/redirect', msalAuth.redirect)

app.get('/logout', (req, res)=>{
  req.session = null

  res.redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://eoys-uploader-2021.glitch.me/')
})


//form endpoints
app.get('/form', async (req, res)=>{
  
  let students = await fetch ('https://eoys-uploader-2021.glitch.me/students').then((request)=>{return request.json()})
  let teachers = await fetch ('https://eoys-uploader-2021.glitch.me/teachers').then((request)=>{return request.json()})
  let courses = await fetch ('https://eoys-uploader-2021.glitch.me/courses').then((request)=>{return request.json()})

  const data = {
    students,
    teachers,
    courses
  }
  
  const renderOptions = {
    data,
    layout: false
  } 
  
  return res.render('form', renderOptions)
})


app.get('/dataTest', async (req, res)=>{
  
  
  
  res.end("done")
})

app.get('/test', async (req, res)=>{
  
  const data = {}
  const renderOptions = {
    data,
    layout: false
  } 
  return res.render('smallform', renderOptions)
})

app.post('/form', upload.any(), async(req, res)=>{

  console.log({body:req.body, files: req.files})

  req.files = req.files.map((file)=>{
    
    file.fullpath = 'https://eoys-uploader-2021.glitch.me/file/' + file.filename
    return file
    
  })
  res.json(req.files)

})

app.get('/file/:filename', (req, res)=>{
  
  res.sendFile(`${__dirname}/uploads/${req.params.filename}`)
})


app.get('/students', (req, res)=>{
  res.json([
    {id:1,name:'student 1'},
    {id:2,name:'student 2'}
  ])
})

app.get('/teachers', (req, res)=>{
  res.json([
    {id:1,name:'teacher 1'},
    {id:2,name:'teacher 2'}
  ])
})

app.get('/courses', (req, res)=>{
  res.json([
    {id:1,name:'course 1'},
    {id:2,name:'course 2'}
  ])
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
