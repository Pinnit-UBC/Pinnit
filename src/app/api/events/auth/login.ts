import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import Session from '@/models/Session';
import crypto from 'crypto';

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    await connectMongo();

    // Step 1: Find the user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Step 2: Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Step 3: Generate a session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

    // Step 4: Save session to MongoDB
    await Session.create({
      user_id: user._id,
      session_token: sessionToken,
      expires_at: expiresAt,
    });

    // Step 5: Set the session token as an HTTP-only cookie
    setCookie('sessionToken', sessionToken, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
