// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const imageCompletion = await openai.createImage({
      prompt: req.body.poem,
      n: 1,
      size: '256x256',
    });
    const image = imageCompletion.data.data[0].url;
    console.log(image);
    res.status(200).send({ image: image });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
