import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';

export default async function register(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create the new user
    await User.create({
      email,
      password_hash: passwordHash,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
