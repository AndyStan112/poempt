import { NextApiRequest, NextApiResponse } from "next";
import { default as prisma } from "../../../lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const poemId = req.query.poemId as string;
    const poem = await prisma.poem.findUnique({
      where: { id: poemId },
      include: { creator: true },
    });
    res.status(200).send({ poem: poem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error" });
  }
}
