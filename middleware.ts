import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import Session from '@/models/Session';

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  await connectMongo();

  // Validate session in MongoDB
  const session = await Session.findOne({ session_token: sessionToken });

  if (!session || new Date() > new Date(session.expires_at)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Apply middleware to protected routes
};
