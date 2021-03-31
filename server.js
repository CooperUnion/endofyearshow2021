// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const msal = require('@azure/msal-node');

/*

.env vars
APPLICATION_CLIENT_ID
DIRECTORY_ID
OBJECT_ID
TENANT_ID
CLOUD_INSTANCE_ID
CLIENT_SECRET_VALUE
CLIENT_SECRET_ID

*/

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
};



// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const cca = new msal.ConfidentialClientApplication(config);

  app.get('/', (req, res) => {
      const authCodeUrlParameters = {
          scopes: ["user.read"],
          redirectUri: "https://eoys-uploader-2021.glitch.me/redirect",
      };

      // get url to sign user in and consent to scopes needed for application
      cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
          res.redirect(response);
      }).catch((error) => console.log(JSON.stringify(error)));
  });

  app.get('/redirect', (req, res) => {
      const tokenRequest = {
          code: req.query.code,
          scopes: ["user.read"],
          redirectUri: "https://eoys-uploader-2021.glitch.me/redirect",
      };

      cca.acquireTokenByCode(tokenRequest).then((response) => {
          console.log("\nResponse: \n:", response);
          res.sendStatus(200);
      }).catch((error) => {
          console.log(error);
          res.status(500).send(error);
      });
  });

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
