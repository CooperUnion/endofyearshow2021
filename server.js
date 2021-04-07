const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const msalAuth = require('./routes/msal-auth');
const fetch = require('node-fetch');
const exphbs  = require('express-handlebars');

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

  let data = {
    students,
    teachers,
    courses
  }
  
  let renderOptions = {
    data,
    layout: false
  } 
  
  return res.render('form', renderOptions)
})

/*

app.post('/form', async(req, res)=>{

  console.log(req.body)

  res.end("ok... check the server console")

})

*/

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
