// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
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
    const image = imageCompletion.data.data[0].url || '';
    const response = await axios.get(image, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'utf-8');
    console.log(buffer);
    console.log(image);
    res.status(200).send({ image: image });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
