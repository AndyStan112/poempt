import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
export const extractIdFromUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  if (!url.startsWith("https://storage.googleapis.com/")) return null;

  const components = url.split("/");
  if (components.length < 5) return null;

  return components[components.length - 1];
};
export const generateUrlFromId = (fileName: string): string =>
  "https://storage.googleapis.com/" + process.env.BUCKET_NAME! + "/" + fileName;

export const sleep = (ms: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
export const isEmpty = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
type PoemCompletionResponse = {
  model: "text-davinci-003" | "gpt-3.5-turbo";
  poem: string;
};
export const getPoemCompletion = async (
  model: string,
  prompt: string
): Promise<string> => {
  if (model === "gpt-3.5-turbo") {
    const poemCompletion = await openai.createChatCompletion({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 256,
    });

    return poemCompletion.data.choices[0].message?.content || "";
  } else {
    const poemCompletion = await openai.createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 256,
    });

    return poemCompletion.data.choices[0].text || "";
  }
};
