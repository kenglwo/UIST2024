import axios from "axios";
import { Message } from "../../types";

// Define the endpoint URL
const apiUrl: string = process.env.NEXT_PUBLIC_CHATGPT_API_ENDPOINT;
const apiKey: string = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;
// const apiModel: string = process.env.NEXT_PUBLIC_CHATGPT_MODEL;

// Make the API request
export async function generateResponse(message: Message[]) {
  // Define the parameters for the API request
  const params = {
    messages: message,
    temperature: 0.7, // Adjust the temperature as needed
    top_p: 1, // Adjust top_p if needed
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    // @ts-ignore
    const response = await axios.post(apiUrl, params, { headers });
    const answer = response.data.choices[0].text;
    return answer;
  } catch (error) {
    console.error("Error:", error);
  }
}
