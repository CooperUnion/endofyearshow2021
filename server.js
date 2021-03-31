const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const msalAuth = require('./routes/msal-auth');
app.use(cookieSession({
  name: 'auth',
  keys: [process.env.COOKIE_KEY],
  maxAge: 168 * 60 * 60 * 1000, // 24*7 hours
  sameSite: true,
  secure: true
}))

app.use(express.static("public"));

app.get('/', msalAuth.validate, (req, res) => {
  
  res.end("hi")
});

app.get('/redirect', msalAuth.redirect)

app.get('/logout', (req, res)=>{
  req.session = null
  res.redirect('/')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
