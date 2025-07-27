const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const calendarService = require('../services/calendarService');

// Route to create a new calendar event
router.post('/', async (req, res, next) => {
  try {
    const { summary, description, startTime, endTime } = req.body;

    // Initialize OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const appointment = { summary, description, startTime, endTime };
    const event = await calendarService.createEvent(oAuth2Client, appointment);
    res.json({ event });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
