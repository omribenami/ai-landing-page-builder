const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res, next) => {
  try {
    const { occupation, location, hours, contact, vibe, colors, fonts } = req.body;
    const prompt = `You are an expert web designer. Generate HTML and Tailwind CSS for a landing page.\n\n`
      + `Occupation: ${occupation}\nLocation: ${location}\nHours: ${hours}\nContact: ${contact}\nVibe: ${vibe}\nColors: ${colors}\nFonts: ${fonts}.\n\n`
      + `Create sections: hero with headline and call‑to‑action, about section, services, contact form. Use semantic HTML and Tailwind classes. Return JSON with keys 'html' and 'cssTokens'.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You generate website code as JSON.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });
    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);
    // Here you would persist parsed.html and parsed.cssTokens to DB or storage
    return res.json(parsed);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
