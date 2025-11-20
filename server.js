// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// Create OpenAI Client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY   // 你需要在环境变量设置这里
});

// Test route
app.get("/", (req, res) => {
    res.send("Artist Story API Running");
});

// Main API
app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        // 🔥 真实 AI 调用（gpt-4o-mini 或 你想要的模型）
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "现在你是一个专业艺术总监，你会根据用户给出的主题生成艺术家人设、艺术理念、创作风格、背景故事、标签与文案。输出结构必须是 JSON。"
                },
                {
                    role: "user",
                    content: `生成关于主题「${prompt}」的完整艺术家包装。`
                }
            ],
            temperature: 0.8
        });

        const output = completion.choices[0].message?.content;

        res.json({
            success: true,
            data: output
        });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
