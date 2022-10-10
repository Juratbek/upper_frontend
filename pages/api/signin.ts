import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<void>): void {
  const { token } = req.query;
  if (token && token !== 'undefined') {
    setCookie('token', 'token', {
      req,
      res,
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res.status(200).json();
  }
  res.status(400).json();
}
