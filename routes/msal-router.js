const msalAuth = require('./msal-auth');



module.exports = (req, res, next) => {
  console.log("router in use")

  next()
}