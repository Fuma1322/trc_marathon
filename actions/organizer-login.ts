'use server';

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'trc-organizer-session';
const SESSION_DURATION = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters.');
  }

  return new TextEncoder().encode(secret);
}

export async function loginOrganizer(input: { email: string; password: string }) {
  const email = input.email?.trim().toLowerCase();
  const password = input.password;

  if (!email || !password) {
    return { success: false, error: 'Enter your email and password.' };
  }

  const configuredEmail = process.env.ORGANIZER_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ORGANIZER_PASSWORD_HASH;

  if (!configuredEmail || !passwordHash) {
    console.error('Organiser login environment variables are missing.');
    return { success: false, error: 'Login is not configured.' };
  }

  try {
    const passwordMatches = await bcrypt.compare(password, passwordHash);

    if (email !== configuredEmail || !passwordMatches) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const token = await new SignJWT({ role: 'organizer' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('trc-organizer')
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(getSecret());

    cookies().set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION,
    });

    return { success: true };
  } catch (error) {
    console.error('Organiser login failed:', error);
    return { success: false, error: 'Unable to sign in right now.' };
  }
}

export async function logoutOrganizer() {
  cookies().delete(COOKIE_NAME);
}
