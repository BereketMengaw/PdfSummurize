"use server";
import OpenAI from "openai";
import { resumeGradingPrompt } from "@/utils/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

export async function generateResult(pdfText: string) {
  let completion;
  try {
    // Attempt to make the API call
    console.log(pdfText, "this is what will be sent to the api");
    completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: resumeGradingPrompt(pdfText),
        },
        {
          role: "user",
          content: `transform this document into ready easy-to-read and clear resume :/n/n${pdfText}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });
  } catch (error) {
    // Generic error handler
    console.error("Error generating result:", error);

    // Check for rate limit error (429)
    if (error?.status === 429) {
      console.error("Rate limit error:", error);
      throw new Error("Rate limit exceeded. Please try again later.");

      // Check for server errors (500)
    } else if (error?.status === 500) {
      console.error("Server error:", error);
      throw new Error("Server error. Please try again later.");

      // Check for client-side errors (4xx)
    } else if (error?.status >= 400 && error?.status < 500) {
      console.error("Client error:", error);
      throw new Error(
        `Client error: ${error.message}. Please check the request.`
      );

      // Other unexpected errors (network, timeout, etc.)
    } else if (error?.message) {
      console.error("Unexpected error:", error.message);
      throw new Error(`Unexpected error: ${error.message}`);

      // Catch any other type of error (e.g., a missing parameter or invalid API response)
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred. Please try again.");
    }
  }

  // If the API call was successful, return the result
  console.log("Completion result:", completion.choices[0].message.content);

  return completion.choices[0].message.content;
}
