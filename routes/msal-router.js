var express = require('express');
var router = express.Router();

const msalAuth = require('./msal-auth');


router.get('/', (req, res, next)=>{
  
  console.log('/auth in router hit...')
  next()
})

router.get('/logout', (req, res)=>{
  req.session = null

  res.redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://eoys-uploader-2021.glitch.me/')
})


module.exports = router