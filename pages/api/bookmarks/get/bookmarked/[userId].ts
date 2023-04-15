import type { NextApiRequest, NextApiResponse } from 'next';
import { default as prisma } from '../../../../../lib/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId as string;
    const poemId = req.body.poemId as string;
    const bookmarked = await prisma.bookmark.count({
      where: { saverId: userId, poemId },
    });

    res.status(200).send({ bookmarked });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
