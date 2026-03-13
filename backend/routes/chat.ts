import { Router, type Request, type Response } from "express";
import Groq from "groq-sdk";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const groq = new Groq();
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: true, message: "Некорректный формат сообщения." });
    }

    const cleanMessage = message.trim();
    if (cleanMessage === "") {
      return res
        .status(400)
        .json({ error: true, message: "Сообщение не может быть пустым." });
    }

    const completion = await groq.chat.completions.create({
      messages: [{ content: cleanMessage, role: "user" }],
      model: "openai/gpt-oss-120b",
      max_tokens: 500,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "ИИ не смог сгенерировать ответ.";
    return res.json({ role: "ai", text: aiResponse });
  } catch (err: any) {
    console.error("Groq API Error:", err.message || err);

    if (err.status === 429) {
      return res
        .status(429)
        .json({ error: true, message: "Превышен лимит запросов к ИИ." });
    }

    return res.status(500).json({
      error: true,
      message: "Внутренняя ошибка сервера. Попробуйте позже.",
    });
  }
});

export default router;
