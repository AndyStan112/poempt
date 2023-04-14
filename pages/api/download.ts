import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
async function toDataURL(url: any) {
  const buffer = await fetch(url).then((res) => {
    return res.arrayBuffer();
  });

  return 'data:image/png;base64, ' + Buffer.from(buffer).toString('base64');
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = req.body.imageUrl;

    const downloadUrl = await toDataURL(url);
    res.status(200).send({ downloadUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
