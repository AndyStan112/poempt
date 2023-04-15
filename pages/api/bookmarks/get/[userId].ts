import type { NextApiRequest, NextApiResponse } from 'next';
import { GLOBAL_TAKE } from '../../../../lib/constants';
import { default as prisma } from '../../../../lib/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId as string;
    const skip = Number(req.query.skip) || 0;
    console.log(skip);

    const transaction = await prisma.$transaction([
      prisma.bookmark.count({ where: { saverId: userId } }),
      prisma.bookmark.findMany({
        where: { saverId: userId },
        include: { poem: { include: { creator: true } } },
        take: GLOBAL_TAKE,
        skip,
      }),
    ]);
    const total = transaction[0];
    const bookmarks = transaction[1];
    res.status(200).send({ bookmarks: bookmarks, total: total });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
