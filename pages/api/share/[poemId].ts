import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = req.query.poemId;

    res.status(200).send({ t: 'downloadUrl' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
