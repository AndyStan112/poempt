// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { getPoemCompletion } from "../../../lib/util";
const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let prompt = "make a poem";
    const data = req.body;
    prompt =
      // "Write the continuation of a poem. Before the continuation, write a sugestive title separated by spaces. Base your creation on the following poem : /n" +
      "Suggest a title for and write a continuation for the following poem without including the original, in the same language as the original: /n" +
      data.poem;
    (".");

    // console.log(prompt);
    const poemCompletion = await getPoemCompletion(
      data.model || "gpt-3.5-turbo",
      prompt
    );
    // console.log(poemCompletion);
    const title = poemCompletion
      .trim()
      .split("\n")[0]
      .replace("title", "")
      .replace("Title", "")
      .replace("titlu", "")
      .replace("Titlu", "")
      .replace(":", "")
      .replace('"', "");
    const verseArray = poemCompletion
      .trim()
      .split("\n")
      .filter((e) => !e.toLowerCase().startsWith("verse"));
    verseArray.splice(0, 1);

    const gen_poem = verseArray.join("\n");

    res.status(200).send({ title: title, poem: gen_poem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error" });
  }
}
