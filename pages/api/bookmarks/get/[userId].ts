import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId as string;
    const bookmarks = await prisma.bookmark.findMany({
      where: { saverId: userId },
      include: { poem: true },
    });
    console.log;
    res.status(200).send({ bookmarks: bookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
