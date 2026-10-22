'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginOrganizer } from '@/actions/organizer-login';

export default function OrganizerLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    startTransition(async () => {
      const result = await loginOrganizer({ email, password });

      if (!result.success) {
        setError(result.error ?? 'Sign-in failed.');
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-[#111111]">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-2xl font-black text-[#111111]">
            T
          </div>

          <h1 className="text-2xl font-bold">TRC Race</h1>
          <p className="mt-2 text-sm text-gray-500">Organiser dashboard access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Organiser email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-[#111111] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Signing in...' : 'Sign in securely'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">Authorised organisers only.</p>
      </div>
    </main>
  );
}
