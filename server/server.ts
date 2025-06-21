import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import { env } from "./env.server";
import { genericPrompt } from "./prompts/generic";
import { z } from "zod";
import bodyParser from "body-parser";
// import ViteExpress from "vite-express";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return "application/json";
    },
  }),
);

app.get("/message", (_, res) => {
  res.send("Hello from express!");
});

const zOpenAIBody = z.object({
  intention: z.string(),
});

export type OpenAIRequestBody = z.infer<typeof zOpenAIBody>;

app.post("/openai", async (req, res, next) => {
  try {
    const body = zOpenAIBody.parse(req.body);
    const result = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: genericPrompt(body.intention),
    });
    res.send(result.choices[0].message.content);
  } catch (e) {
    next(e);
  }
});

// @ts-ignore
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
app.listen(3000, () => console.log("Server is listening..."));
