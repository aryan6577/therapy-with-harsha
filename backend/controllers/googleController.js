const fs = require("fs");
const { oauth2Client, tokenPath } = require("../config/google");

// Redirect user to Google Login
exports.googleLogin = (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
    ],
  });

  res.redirect(url);
};

// Callback after Google Login
exports.googleCallback = async (req, res) => {
  try {

    const code = req.query.code;

    const { tokens } =
      await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    fs.mkdirSync("token", { recursive: true });

    fs.writeFileSync(
      tokenPath,
      JSON.stringify(tokens, null, 2)
    );

    res.send(`
      <h2>Google Account Connected Successfully ✅</h2>
      <p>You may close this window.</p>
    `);

  } catch (err) {

    console.log(err);

    res.status(500).send(err.message);

  }
};