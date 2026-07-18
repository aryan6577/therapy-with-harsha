const { google } = require("googleapis");
const { v4: uuid } = require("uuid");
const path = require("path");

const credentials = require(
  path.join(
    __dirname,
    "../config/google-oauth.json"
  )
);

const oauth2Client =
  new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );

// ===============================
// Generate Google Auth URL
// ===============================

function getAuthUrl() {

  return oauth2Client.generateAuthUrl({

    access_type: "offline",

    prompt: "consent",

    scope: [

      "https://www.googleapis.com/auth/calendar"

    ]

  });

}

// ===============================
// Save OAuth Tokens
// ===============================

function setCredentials(tokens) {

  oauth2Client.setCredentials(tokens);

}

// ===============================
// Exchange Code
// ===============================

async function getTokens(code) {

  const { tokens } =
    await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  return tokens;

}

// ===============================
// Create Meet Link
// ===============================

async function createGoogleMeet({

  summary,

  description,

  start,

  end,

  attendees,

}) {

  const calendar =
    google.calendar({

      version: "v3",

      auth: oauth2Client,

    });

  const event = {

    summary,

    description,

    start: {

      dateTime: start,

      timeZone: "Asia/Kolkata",

    },

    end: {

      dateTime: end,

      timeZone: "Asia/Kolkata",

    },

    attendees,

    conferenceData: {

      createRequest: {

        requestId: uuid(),

      },

    },

  };

  const response =
    await calendar.events.insert({

      calendarId: "primary",

      conferenceDataVersion: 1,

      requestBody: event,

    });

  return response.data;

}

module.exports = {

  getAuthUrl,

  getTokens,

  setCredentials,

  createGoogleMeet,

};