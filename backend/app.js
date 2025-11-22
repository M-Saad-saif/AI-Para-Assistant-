import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

// adding this
// const FRONTEND_URL = process.env.FRONTEND_URL || "*";
// app.use(cors({ origin: FRONTEND_URL }));
const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate", async (req, res) => {
  const { text, action } = req.body;

  let prompt = "";

  switch (action) {
    case "summarize":
      prompt = `Summarize this text in simple short points:\n\n${text}`;
      break;
    case "quiz":
      prompt = `Create 5 multiple choice questions with answers from this text:\n\n${text}`;
      break;
    case "simplify":
      prompt = `Rewrite this text in very simple words:\n\n${text}`;
      break;
    case "eli5":
      prompt = `Explain this text like I am 5 years old:\n\n${text}`;
      break;
    case "translate":
      prompt = `Translate this text into Urdu:\n\n${text}`;
      break;
    case "keypoints":
      prompt = `Extract key points from this text:\n\n${text}`;
      break;
    default:
      prompt = text;
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// adding this
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
