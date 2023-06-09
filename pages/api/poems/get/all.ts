import type { NextApiRequest, NextApiResponse } from "next";
import { default as prisma } from "../../../../lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.query.userId as string;
    const skip = Number(req.query.skip) || 0;
    //CHAGE HARDCODED LIMIT IN PRODUCTION
    const transaction = await prisma.$transaction([
      prisma.poem.count({}),
      prisma.poem.findMany({
        include: { creator: true },
        take: 10,
        skip,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    const total = transaction[0];
    const poems = transaction[1];
    res.status(200).send({ poems: poems, total: total });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error" });
  }
}
