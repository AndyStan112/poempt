import { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'node-fetch';
import { default as prisma } from '../../../lib/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.query.userId;
    const { poem, poemId } = req.body;
    console.log(userId, poem, poemId);
    await fetch(process.env.NEXTAUTH_URL + '/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ poem }),
    })
      .then((res) => res.json())
      .then(({ image }) => {
        console.log(image);
      });
    res.status(200).send({ test: 'test' });
  } catch (error) {
    console.log('regenerate', error);
    res.status(500).send({ result: { error } });
  }
}
