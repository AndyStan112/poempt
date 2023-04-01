// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
const getResult = () => {};
// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const poemCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.text,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 64,
    });
    const poem = poemCompletion.data.choices[0].text;
    console.log(poem);
    res.status(200).send({ poem: poem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
