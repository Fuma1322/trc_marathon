import { cookies, headers } from 'next/headers';
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
  const cookieStore = cookies();
  const requestHeaders = headers();

  // Diagnostic information only. Never log cookie values.
  console.log('[Organizer Auth] Host:', requestHeaders.get('host'));
  console.log('[Organizer Auth] Origin:', requestHeaders.get('origin'));
  console.log(
    '[Organizer Auth] Cookie names:',
    cookieStore.getAll().map((cookie) => cookie.name)
  );

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    console.error('[Organizer Auth] Session cookie is missing.');
    throw new Error('UNAUTHORIZED');
  }

  let secret: Uint8Array;

  try {
    secret = getSecret();
  } catch {
    console.error('[Organizer Auth] SESSION_SECRET is missing or invalid.');
    throw new Error('UNAUTHORIZED');
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    console.log('[Organizer Auth] JWT verified:', true);
    console.log('[Organizer Auth] Role valid:', payload.role === 'organizer');
    console.log('[Organizer Auth] Subject valid:', typeof payload.sub === 'string');

    if (payload.role !== 'organizer' || typeof payload.sub !== 'string') {
      throw new Error('UNAUTHORIZED');
    }

    return { id: payload.sub, role: 'organizer' as const };
  } catch (error) {
    console.error(
      '[Organizer Auth] JWT verification or claims validation failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    throw new Error('UNAUTHORIZED');
  }
}
