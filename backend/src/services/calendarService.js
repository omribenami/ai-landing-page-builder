const { google } = require('googleapis');

async function createEvent(auth, appointment) {
  const calendar = google.calendar({ version: 'v3', auth });
  const event = {
    summary: appointment.summary,
    location: appointment.location,
    description: appointment.description,
    start: {
      dateTime: appointment.start.toISOString(),
      timeZone: appointment.timeZone || 'America/Chicago',
    },
    end: {
      dateTime: appointment.end.toISOString(),
      timeZone: appointment.timeZone || 'America/Chicago',
    },
    attendees: appointment.attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
  const response = await calendar.events.insert({ calendarId: 'primary', resource: event });
  return response.data;
}

module.exports = { createEvent };
