'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logoutOrganizer } from '@/actions/organizer-login';

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutOrganizer();
      router.replace('/login');
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="text-[#111111]disabled:opacity-60 px-4 py-2 text-sm font-medium"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
