import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<void>): void {
  const { theme } = req.query;
  setCookie('theme', theme, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 30, // a month
  });
  return res.status(200).json();
}
