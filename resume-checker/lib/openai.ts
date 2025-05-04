"use server";
import OpenAI from "openai";
import { resumeGradingPrompt } from "@/utils/prompt";

interface APIError {
  status?: number;
  message?: string;
  response?: {
    status?: number;
    data?: unknown;
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

export async function generateResult(pdfText: string) {
  let completion;
  try {
    console.log(pdfText, "this is what will be sent to the API");

    completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: resumeGradingPrompt(pdfText),
        },
        {
          role: "user",
          content: `Transform this document into a ready, easy-to-read, and clear resume:\n\n${pdfText}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });
  } catch (error) {
    const err = error as APIError;
    const status = err?.status || err?.response?.status;

    console.error("Error generating result:", err);

    if (status === 429) {
      console.error("Rate limit error:", err);
      throw new Error("Rate limit exceeded. Please try again later.");
    } else if (status === 500) {
      console.error("Server error:", err);
      throw new Error("Server error. Please try again later.");
    } else if (status && status >= 400 && status < 500) {
      console.error("Client error:", err);
      throw new Error(
        `Client error: ${err.message || "Bad request"}. Please check the request.`
      );
    } else if (err?.message) {
      console.error("Unexpected error:", err.message);
      throw new Error(`Unexpected error: ${err.message}`);
    } else {
      console.error("Unknown error:", err);
      throw new Error("An unknown error occurred. Please try again.");
    }
  }

  const result = completion.choices[0].message.content;
  console.log("Completion result:", result);

  return result;
}
