import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId;
    const { poem, poemId } = req.body;
    console.log(userId, poem, poemId);
    res.status(200).send({ test: 'test' });
  } catch (error) {
    console.log('regenerate', error);
    res.status(500).send({ result: { error } });
  }
}
