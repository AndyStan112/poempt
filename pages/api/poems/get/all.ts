import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId as string;
    const skip = Number(req.query.skip) || 0;
    //CHAGE HARDCODED LIMIT IN PRODUCTION
    const poems = await prisma.poem.findMany({
      include: { creator: true },
      take: 2,
      skip,
    });

    res.status(200).send({ poems: poems });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
