const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

console.log("🚀 Backend starting up...");

dotenv.config();
console.log("✅ Loaded OpenAI key?", !!process.env.OPENAI_API_KEY);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log("📩 Received:", userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    console.log("🤖 Replying:", reply);
    res.json({ reply });
  } catch (error) {
    console.error('❌ OpenAI Error:', error.message);
    res.status(500).json({ error: 'OpenAI API error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
