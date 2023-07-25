import { NextApiRequest, NextApiResponse } from "next";
import { default as prisma } from "../../../lib/prismadb";
import { extractIdFromUrl } from "../../../lib/util";
import bucket from "../../../lib/bucket";
import { generateUrlFromId } from "../../../lib/util";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;
  const { poem, poemId } = req.body;
  // console.log(userId, poemId, "user and poemid ");
  await fetch(process.env.NEXTAUTH_URL + "/api/generate/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ poem }),
  })
    .then((res) => res.json())
    .then(async ({ image }: any) => {
      console.error(image);

      const oldImage = await prisma.poem.findUnique({
        where: { id: poemId },
        select: { image: true },
      });
      const oldUrl = oldImage?.image;
      //console.log(oldUrl);
      const oldFileId = extractIdFromUrl(oldUrl);
      try {
        if (oldFileId)
          await bucket
            .file(oldFileId)
            .delete()
            .catch((e) => console.log("aici: "));
      } catch (error) {
        console.log("delete renew");
      }

      const newFileId = uuidv4() + ".png";
      const newUrl = generateUrlFromId(newFileId);
      await prisma.poem.update({
        where: { id: poemId },
        data: { image: newUrl },
      });
      try {
        const file = bucket.file(newFileId);
        const writeStream = file.createWriteStream();
        await fetch(image)
          .then((resp: any) => {
            //console.log("ici nsakbdkjahkdfhswhfjiasuk", resp);
            resp.body.pipe(writeStream);
          })
          .catch(() => {
            console.log("aici e buba");
          });
        // console.log(newUrl);
      } catch (e) {
        console.log("file or createwrite error");
      }

      //res.setHeader("Cache-Control", "no-cache");
      res.status(200).send({ image: newUrl });
    });
  // } catch (error) {
  //   console.log("regenerate", error);
  //   res.status(500).send({ result: { error } });
  // }
}
