'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LoaderCircle } from 'lucide-react';
import { logoutOrganizer } from '@/actions/organizer-login';

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      try {
        await logoutOrganizer();
        router.replace('/login');
        router.refresh();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      aria-label={isPending ? 'Signing out' : 'Sign out of dashboard'}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-red-200/80 bg-gradient-to-r from-red-50 to-white px-4 py-3 text-sm font-bold text-red-700 shadow-sm shadow-red-950/[0.03] transition-all duration-300 hover:border-red-300 hover:from-red-100 hover:to-red-50 hover:shadow-md hover:shadow-red-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm ring-1 ring-red-100 transition-transform duration-300 group-hover:-translate-x-0.5">
        {isPending ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <LogOut size={17} strokeWidth={2.2} />
        )}
      </span>

      <span className="flex flex-1 flex-col items-start">
        <span>{isPending ? 'Signing out...' : 'Sign out'}</span>
        <span className="mt-0.5 text-[10px] font-medium text-red-400">
          {isPending ? 'Please wait' : 'End your admin session'}
        </span>
      </span>

      {!isPending && (
        <LogOut
          size={15}
          className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
        />
      )}
    </button>
  );
}
