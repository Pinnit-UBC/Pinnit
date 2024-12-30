import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import connectMongo from '@/lib/db';
import Session from '@/models/Session';

export default async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const sessionToken = req.cookies.sessionToken;

  if (sessionToken) {
    await connectMongo();

    // Delete session from MongoDB
    await Session.deleteOne({ session_token: sessionToken });

    // Clear the cookie
    setCookie('sessionToken', '', {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      sameSite: 'strict',
    });
  }

  res.status(200).json({ message: 'Logged out successfully' });
}
