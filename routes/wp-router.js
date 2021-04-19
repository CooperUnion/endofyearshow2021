const express = require('express');
const router = express.Router();
var WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: '' });

const wpLogger = (req, res, next) =>{
  console.log('hit /auth', req.path)
  next()
}

router.get('/', (req, res, next)=>{
  
  
  res.json({ok:true})
})

module.exports = router