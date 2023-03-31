// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).send({ name: 'John Doe' });
  } catch (error) {
    res.status(500).send({ name: 'Internal server error' });
  }
}
