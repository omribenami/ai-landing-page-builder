const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

async function answerQuestion(businessInfo, question) {
  const messages = [
    { role: 'system', content: `You are a helpful assistant for a business.\nBusiness details: ${JSON.stringify(businessInfo)}` },
    { role: 'user', content: question },
  ];
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages,
    max_tokens: 300,
    temperature: 0.3,
  });
  return response.data.choices[0].message.content.trim();
}

module.exports = { answerQuestion };
