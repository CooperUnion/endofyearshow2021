module.exports = (msal) =>{
  return {
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
};
