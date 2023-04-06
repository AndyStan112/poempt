import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL_TAKE } from '../../../../lib/constants';
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

// TODO: throw errors if env variables do not exist
const bucket = storage.bucket(process.env.BUCKET_NAME!);

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

    const fileName = uuidv4() + '.png';
    const file = bucket.file(fileName);
    const writeStream = file.createWriteStream();

    await fetch(image).then((res: any) => {
      res.body.pipe(writeStream);
    });

    const imageUrl =
      'https://storage.googleapis.com/' +
      process.env.BUCKET_NAME! +
      '/' +
      fileName;
    const poemPost = await prisma.poem.create({
      data: { creatorId: userId, title: title, poem: poem, image: imageUrl },
    });
    try {
      const latestPoems = await prisma.poem.findMany({
        where: { creatorId: userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true },
        take: GLOBAL_TAKE,
      });
      console.log('latest: ', latestPoems);
      const bookmarkedPoemIds = await prisma.bookmark.findMany({
        where: { saverId: userId },
        select: { poemId: true },
      });
      console.log('bookmarked: ', bookmarkedPoemIds);
      const deleteCount = await prisma.poem.deleteMany({
        where: {
          AND: [
            { creatorId: userId },
            {
              NOT: {
                id: {
                  in: latestPoems.map((poem) => poem.id),
                },
              },
            },
            {
              NOT: {
                id: {
                  in: bookmarkedPoemIds.map((bookmark) => bookmark.poemId),
                },
              },
            },
          ],
        },
      });
      console.log('deleted : ', deleteCount);
    } catch (e) {
      console.log(e);
    }
    console.log('poemPost.id: ' + poemPost.id);
    res.status(200).send({ result: 'successful', poemId: poemPost.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
