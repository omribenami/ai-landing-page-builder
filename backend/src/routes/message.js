const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsappService');

// Route to send a WhatsApp message
router.post('/', async (req, res, next) => {
  try {
    const { to, body } = req.body;
    const result = await whatsappService.sendWhatsAppMessage(to, body);

    res.json({ result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
