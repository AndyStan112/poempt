import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method != 'POST')
      res.status(500).send({ message: 'Wrong request' });
    const userId = req.query.userId as string;
    const { title, poem, image } = req.body;
    const poemPost = await prisma.poem.create({
      data: { creatorId: userId, title: title, poem: poem, image: image },
    });
    console.log('poemPost.id: ' + poemPost.id);
    res.status(200).send({ result: 'successful', poemId: poemPost.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
