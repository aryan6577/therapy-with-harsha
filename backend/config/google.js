const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentials = require("../credentials/client_secret.json");

const {
  client_id,
  client_secret,
  redirect_uris,
} = credentials.web;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const tokenPath = path.join(
  __dirname,
  "../token/token.json"
);

if (fs.existsSync(tokenPath)) {

  oauth2Client.setCredentials(
    JSON.parse(
      fs.readFileSync(tokenPath)
    )
  );

}

module.exports = {
  google,
  oauth2Client,
  tokenPath,
};