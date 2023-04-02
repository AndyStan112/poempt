// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import keyword_extractor from "keyword-extractor";
import { stanzaStyles } from "../../lib/constants";
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
    console.log(data);
    // const keywords = keyword_extractor
    //   .extract(data.subject, {
    //     language: "english",
    //     remove_digits: true,
    //     return_changed_case: false,
    //     remove_duplicates: true,
    //   })
    //   .join(",");

    if (data.stanzaStyle == stanzaStyles[0]) {
      prompt =
        "Write a title and verses for a " +
        data.mood +
        " " +
        data.stanzaStyle +
        " poem in the " +
        data.writingStyle +
        " style, with a " +
        data.rhyme +
        " and " +
        data.verses +
        " lines per stanza, based on the following subject: " +
        data.subject +
        ".";
    } else {
      prompt =
        "Write a title and verses for a " +
        data.mood +
        " " +
        data.stanzaStyle +
        " poem in the " +
        data.writingStyle +
        " style, based on the following subject: " +
        data.subject +
        ".";
    }

    console.log('Prompt: "' + prompt + '"');

    const poemCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 256,
    });
    const response = poemCompletion.data.choices[0].text || "";

    console.log('Response: "' + response + '"');

    const title = response
      .trim()
      .split("\n")[0]
      .replace("title", "")
      .replace("Title", "")
      .replace(":", "")
      .replace('"', "");
    const verseArray = response
      .trim()
      .split("\n")
      .filter((e) => !e.toLowerCase().startsWith("verse"));
    verseArray.splice(0, 1);
    const poem = verseArray.join("\n");

    console.log(title, poem);
    res.status(200).send({ title: title, poem: poem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error" });
  }
}
