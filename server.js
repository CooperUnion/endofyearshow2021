const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const config = require('./msal-config')(msal)
const msalAuth = require('./msal-auth');
app.use(cookieSession({
  name: 'auth',
  keys: [process.env.COOKIE_KEY],
  maxAge: 168 * 60 * 60 * 1000, // 24*7 hours
  sameSite: true,
  secure: true
}))





// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const cca = new msal.ConfidentialClientApplication(config);

app.get('/', (req, res) => {
  
    if(req.session.user) {
      return res.json(req.session)
    } else {
      const authCodeUrlParameters = {
          scopes: ["user.read"],
          redirectUri: "https://eoys-uploader-2021.glitch.me/redirect",
      };

      // get url to sign user in and consent to scopes needed for application
      cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
          return res.redirect(response);
      }).catch((error) => console.log(JSON.stringify(error)));  
    }
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
