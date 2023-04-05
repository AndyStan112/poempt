import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { PrismaClient } from '@prisma/client';
const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();
async function toDataURL(url: any) {
  const buffer = await fetch(url).then((res) => {
    console.log(typeof res.blob);
    return res.arrayBuffer();
  });
  console.log(typeof buffer, buffer);
  return Buffer.from(buffer).toString('base64');
}
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
    const base64Data = await toDataURL(image);
    const test = 'data:image/png;base64, ' + base64Data;
    try {
      await prisma.poem.create({
        data: {
          title: 'test',
          poem: 'testare mare',
          image: test,
          creatorId: 'clfy6ub0a0000u4s0h8g91jb5',
        },
      });
    } catch (e) {
      console.log(e, 's');
    }
    console.log(typeof test);
    res.status(200).send({ image: test || 'generic_user.png' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
