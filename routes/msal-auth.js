const msal = require('@azure/msal-node');
const config = {
    auth: {
        clientId: process.env.APPLICATION_CLIENT_ID,
        authority: `${process.env.CLOUD_INSTANCE_ID}/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET_VALUE
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
}
const cca = new msal.ConfidentialClientApplication(config);

exports.validate = (req, res, next)=>{
  if(req.session.user) {
    console.log('user has a valid session')
    return next()
  } else {
    console.log('user has no session', req.session)
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "https://eoys-uploader-2021.glitch.me/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        return res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));  
  }
}

exports.redirect = (req, res, next)=>{
  const tokenRequest = {
      code: req.query.code,
      scopes: ["user.read"],
      redirectUri: "https://eoys-uploader-2021.glitch.me/redirect",
  };

  cca.acquireTokenByCode(tokenRequest).then((response) => {
      console.log("\nResponse: \n:", response);

      req.session.user = {
        name: response.account.name,
        email: response.account.username
      }
      return res.redirect('/')
  }).catch((error) => {
      console.log(error);
      return res.status(500).send(error);
  });
}

exports.logout = (req, res) =>{
  req.session = null
  res.redirect('/')
}