//app setup and auth
const express = require("express");
const app = express();
const msal = require('@azure/msal-node');
const cookieSession = require("cookie-session");
const exphbs  = require('express-handlebars');

//custom middleware
const data = require('./lib/data');
const msalAuth = require('./lib/msal-auth');

//custom routers
const msalRouter = require('./routes/msal-router');
const formRouter = require('./routes/form-router');
const indexRouter = require('./routes/index-router');
const wpRouter = require('./routes/wp-router');

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
//router setups
const auth = express.Router()
auth.use(msalRouter)

const form = express.Router()
form.use(formRouter)

const wp = express.Router()
wp.use(wpRouter)

const index = express.Router()
index.use(indexRouter)
 
//attach routers
app.use('/auth', auth)
app.use('/form', form)
app.use('/wp', wp)
app.use('/', index)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
