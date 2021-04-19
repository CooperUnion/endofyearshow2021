//app setup and auth
const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const exphbs  = require('express-handlebars');

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

//custom middleware
const data = require('./routes/data');
const msalAuth = require('./routes/msal-auth');
const msalRouter = require('./routes/msal-router');
const formRouter = require('./routes/form-router');

//router setups
const auth = express.Router()
auth.use(msalRouter)

const form = express.Router()
form.use(formRouter)
 
//handlebars interception of .html files for custom rendering
app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');

//always use cookies
app.use(cookieSession({
  name: 'auth',
  keys: [process.env.COOKIE_KEY],
  maxAge: 168 * 60 * 60 * 1000, // 24*7 hours
}))

//serve static assets from /public
app.use(express.static("public"));

//auth router redirects
app.get('/', msalAuth.validate, (req, res) => {
  res.redirect('/form')
});

app.get('/logout', (req, res)=>{
  res.redirect('/auth/logout')
})



//form endpoints
app.get('/form', async (req, res)=>{
  
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
  
  return res.render('form', renderOptions)
})


app.get('/dataTest', async (req, res)=>{
  
  let csvData = await data.courses()
  
  res.json(csvData)
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


app.get('/students', async (req, res)=>{
  let csvData = await data.students()
  
  res.json(csvData)
})

app.get('/teachers', async (req, res)=>{
  let csvData = await data.faculty()
  
  res.json(csvData)
})

app.get('/courses', async (req, res)=>{
  let csvData = await data.courses()
  
  res.json(csvData)
})


app.get("/token", async (req, res) => {
  res.json({ token: process.env.VIMEO_ACCESS_TOKEN });
});


app.get('/original', async (req, res)=>{
  
  const data = {}
  const renderOptions = {
    data,
    layout: false
  } 
  return res.render('original', renderOptions)
})

//load routers
app.use('/auth', auth)
app.use('/form', form)



const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
