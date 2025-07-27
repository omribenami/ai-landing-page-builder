require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const generateRoute = require('./routes/generate');
const appointmentsRoute = require('./routes/appointments');
const messageRoute = require('./routes/message');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/generate', generateRoute);
app.use('/api/appointments', appointmentsRoute);
app.use('/api/message', messageRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
