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
      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#111111] hover:bg-gray-50 disabled:opacity-60"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
