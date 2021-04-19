const express = require('express');
const router = express.Router();
const msalAuth = require('../lib/msal-auth');


const authLogger = (req, res, next) =>{
  console.log('hit /auth', req.path)
  next()
}

router.get('/redirect', authLogger, msalAuth.redirect)


router.get('/logout', authLogger, (req, res)=>{
  req.session = null
  res.redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://eoys-uploader-2021.glitch.me/')
})


module.exports = router