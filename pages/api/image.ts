import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { PrismaClient } from '@prisma/client';
const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const str = req.body.poem;
    const poem = str.normalize('NFKD').replace(/[^\w]/g, '');

    const imageCompletion = await openai.createImage({
      prompt: poem,
      n: 1,
      size: '256x256',
    });
    const image = imageCompletion.data.data[0].url || '';

    res.status(200).send({ image: image || 'generic_user.png' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
