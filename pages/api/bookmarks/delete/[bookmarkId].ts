import type { NextApiRequest, NextApiResponse } from 'next';
import { default as prisma } from '../../../../lib/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method != 'DELETE')
      res.status(500).send({ message: 'Wrong request' });
    const bookmarkId = req.query.bookmarkId as string;
    console.log(bookmarkId);
    if (!bookmarkId) throw new Error('no bookmark id given');
    const count = await prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
    console.log('deleted: ', count);
    res.status(200).send({ result: 'successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: error });
  }
}
