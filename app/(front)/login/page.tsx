'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// This is a UI demonstration only; authentication is not implemented.
export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Login is not connected yet. Add secure authentication before using real accounts.');
  }

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
          <LockKeyhole size={26} />
        </div>
        <h1 className="mt-5 text-center text-2xl font-black">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in to access your runner account.
        </p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          {message && (
            <p
              role="status"
              className="rounded-xl bg-amber-50 p-3 text-sm leading-5 text-amber-900"
            >
              {message}
            </p>
          )}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          New to TRC Race?{' '}
          <Link href="/register" className="font-bold text-green-800 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
