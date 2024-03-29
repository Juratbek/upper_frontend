import { deleteCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<void>): void {
  deleteCookie('token', {
    req,
    res,
  });
  return res.status(200).json();
}
