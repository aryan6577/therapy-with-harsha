const { google, oauth2Client } = require("../config/google");

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

exports.createGoogleMeet = async ({
  patientName,
  patientEmail,
  appointmentDate,
  appointmentTime,
  duration = 60,
}) => {

  try {

    // appointmentDate = YYYY-MM-DD
    // appointmentTime = HH:MM

    const start = new Date(
      `${appointmentDate}T${appointmentTime}:00`
    );

    const end = new Date(
      start.getTime() + duration * 60000
    );

    const event = {

      summary: `Therapy Session - ${patientName}`,

      description:
        "Therapy With Harsha Online Consultation",

      start: {
        dateTime: start.toISOString(),
        timeZone: "Asia/Kolkata",
      },

      end: {
        dateTime: end.toISOString(),
        timeZone: "Asia/Kolkata",
      },

      attendees: [
        {
          email: patientEmail,
        },
      ],

      conferenceData: {

        createRequest: {

          requestId:
            Date.now().toString(),

          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },

        },

      },

    };

    const response =
      await calendar.events.insert({

        calendarId: "primary",

        resource: event,

        conferenceDataVersion: 1,

        sendUpdates: "all",

      });

    return {

      success: true,

      meetLink:
        response.data.hangoutLink,

      eventId:
        response.data.id,

    };

  } catch (err) {

    console.log(err);

    return {

      success: false,

      error: err.message,

    };

  }

};