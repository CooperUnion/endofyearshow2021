const express = require('express');
const router = express.Router();

const wpLogger = (req, res, next) =>{
  console.log('hit /auth', req.path)
  next()
}

router.get('/redirect', wpLogger)


module.exports = router