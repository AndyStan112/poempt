import type { NextApiRequest, NextApiResponse } from "next";
import { default as prisma } from "../../../../lib/prismadb";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { GLOBAL_TAKE } from "../../../../lib/constants";
import { extractIdFromUrl, generateUrlFromId } from "../../../../lib/util";
import bucket from "../../../../lib/bucket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "POST")
      res.status(500).send({ message: "Wrong request" });
    const userId = req.query.userId as string;
    const { title, poem, image } = req.body;

    const fileName = uuidv4() + ".png";
    const file = bucket.file(fileName);
    const writeStream = file.createWriteStream();

    await fetch(image).then((res: any) => {
      res.body.pipe(writeStream);
    });

    const imageUrl = generateUrlFromId(fileName);
    const poemPost = await prisma.poem.create({
      data: { creatorId: userId, title: title, poem: poem, image: imageUrl },
    });
    try {
      //get Latest Poems
      const latestPoems = await prisma.poem.findMany({
        where: { creatorId: userId },
        orderBy: { createdAt: "desc" },
        select: { id: true },
        take: GLOBAL_TAKE,
      });
      // console.log("latest: ", latestPoems);
      //get Bookmarked Poems
      const bookmarkedPoemIds = await prisma.bookmark.findMany({
        where: { saverId: userId },
        select: { poemId: true },
      });
      // console.log("bookmarked: ", bookmarkedPoemIds);
      //get poems to be deleted
      const deletables = await prisma.poem.findMany({
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
      if (!deletables.length) {
        res.status(200).send({ result: "successful", poemId: poemPost.id });
        return;
      }

      // console.log("Will delete : ", deletables);
      const deleteCount = await prisma.poem.deleteMany({
        where: {
          AND: [
            { creatorId: userId },
            { id: { in: deletables.map((poem) => poem.id) } },
          ],
        },
      });
      // console.log("count: ", deleteCount);

      deletables
        .map(({ image }) => extractIdFromUrl(image))
        .forEach((id) => {
          if (id) bucket.file(id).delete();
        });
    } catch (e) {
      console.log("post poems", e);
    }
    // console.log("poemPost.id: " + poemPost.id);
    res.status(200).send({ result: "successful", poemId: poemPost.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error" });
  }
}
