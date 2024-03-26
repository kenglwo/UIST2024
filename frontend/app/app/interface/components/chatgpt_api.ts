import axios from "axios";
import { Message } from "../../types";

// Define the endpoint URL
// const apiUrl: string = process.env.NEXT_PUBLIC_CHATGPT_API_ENDPOINT;
// const apiKey: string = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;
// const apiModel: string = process.env.NEXT_PUBLIC_CHATGPT_MODEL;

const apiUrl: string | undefined =
  process.env.NEXT_PUBLIC_CHATGPT_API_ENDPOINT2;
const apiKey: string | undefined = process.env.NEXT_PUBLIC_CHATGPT_API_KEY2;
const apiModel: string | undefined = process.env.NEXT_PUBLIC_CHATGPT_MODEL2;

// Make the API request
export async function generateResponse(message: Message[]) {
  // Define the parameters for the API request
  // const params = {
  //   messages: message,
  //   temperature: 0.7, // Adjust the temperature as needed
  //   top_p: 1, // Adjust top_p if needed
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.0,
  // };
  // const headers = {
  //   "Content-Type": "application/json",
  //   "api-key": apiKey,
  //   "Access-Control-Allow-Origin": "*",
  // };
  const params = {
    messages: message,
    model: apiModel,
    temperature: 0.7, // Adjust the temperature as needed
    top_p: 1, // Adjust top_p if needed
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
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

export async function askChatGptToReadEmbeddedContent(
  userId: string,
  content: string,
  mode: string,
) {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}/ask_read_content`;
  const data = {
    user_id: userId,
    embedded_content_type: content,
    mode,
  };
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, header);
    const result = await response.json();

    if (result.output_prompt === "API_ERROR") {
      window.alert("ChatGPT Could not read the embedded content");
      // Assuming false means ChatGPT could not read the content
      return false;
    } else {
      window.alert("ChatGPT successfully read the embedded content");
      console.log(result.output_prompt);
      // Assuming true means ChatGPT successfully read the content
      return true;
    }
  } catch (error) {
    window.alert("ChatGPT Could not read the embedded content");
    console.log("========== API error ==========");
    console.log(error);
    // If there's an error, assuming false since it couldn't read the content
    return false;
  }
}
