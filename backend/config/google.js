const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

let credentials;

if (process.env.GOOGLE_CREDENTIALS) {
  credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
} else {
  credentials = require("../credentials/client_secret.json");
}

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

const tokenPath = path.join(__dirname, "../token/token.json");

if (process.env.GOOGLE_TOKEN) {
  oauth2Client.setCredentials(
    JSON.parse(process.env.GOOGLE_TOKEN)
  );
} else if (fs.existsSync(tokenPath)) {
  oauth2Client.setCredentials(
    JSON.parse(fs.readFileSync(tokenPath))
  );
}

module.exports = {
  google,
  oauth2Client,
  tokenPath,
};