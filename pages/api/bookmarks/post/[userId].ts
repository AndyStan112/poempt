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
    const { poemId } = req.body;
    prisma.bookmark.create({
      data: { saverId: userId, poemId: poemId },
    });
    res.status(200).send({ result: 'successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
