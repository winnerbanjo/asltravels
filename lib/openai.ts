import OpenAI from "openai";

export const hasOpenAIConfig = Boolean(process.env.OPENAI_API_KEY);
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
