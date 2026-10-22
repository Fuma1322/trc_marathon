import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'trc-organizer-session';

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be configured securely.');
  }

  return new TextEncoder().encode(secret);
}

export async function requireOrganizer() {
  const token = cookies().get(COOKIE_NAME)?.value;

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());

    if (payload.role !== 'organizer' || typeof payload.sub !== 'string') {
      throw new Error('UNAUTHORIZED');
    }

    return { id: payload.sub, role: 'organizer' as const };
  } catch {
    throw new Error('UNAUTHORIZED');
  }
}
