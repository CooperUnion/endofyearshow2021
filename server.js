const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const msalAuth = require('./routes/msal-auth');
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
  
  /*
     "https://login.microsoftonline.com/common/oauth2/v2.0/logout"
        "?post_logout_redirect_uri=" + url_for("index", _external=True))
  */
  res.redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://eoys-uploader-2021.glitch.me/')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
