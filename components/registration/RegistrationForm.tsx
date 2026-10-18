'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import { CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RACE_CATEGORIES, type RaceCategoryId } from '@/lib/constants';

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRace = searchParams.get('race');
  const initialRace = RACE_CATEGORIES.find((race) => race.id === requestedRace)?.id ?? '5km';
  const [raceId, setRaceId] = useState<RaceCategoryId>(initialRace);
  const [error, setError] = useState('');

  const selectedRace = RACE_CATEGORIES.find((race) => race.id === raceId)!;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    // Demo only: no personal data is stored or sent to a server.
    router.push(`/payments?race=${selectedRace.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-800">
          <CheckCircle2 size={21} />
        </span>
        <div>
          <h2 className="font-extrabold">Personal information</h2>
          <p className="mt-1 text-xs text-gray-500">Fields marked with * are required.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="Enter your full name"
          required
        />
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+266 ..."
          required
        />
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-800">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
            defaultValue=""
          >
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-9 border-t border-gray-100 pt-7">
        <h2 className="font-extrabold">Choose your race category</h2>
        <p className="mt-1 text-sm text-gray-500">Select one distance. Your fee is shown below.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {RACE_CATEGORIES.map((race) => (
            <label
              key={race.id}
              className={`cursor-pointer rounded-2xl border p-4 transition ${raceId === race.id ? 'border-[#25D366] bg-green-50 ring-2 ring-green-100' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <input
                type="radio"
                name="raceCategory"
                value={race.id}
                checked={raceId === race.id}
                onChange={() => setRaceId(race.id)}
                className="sr-only"
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="block font-extrabold">{race.name}</span>
                  <span className="mt-1 block text-xs text-gray-500">{race.level}</span>
                </div>
                <span className="font-black text-green-800">M{race.fee}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">Selected entry fee</span>
          <span className="text-xl font-black text-[#111111]">M{selectedRace.fee}</span>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-gray-600">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#25D366]" />
        <span>
          I confirm that the details provided are accurate and understand that this information will
          be used for race registration purposes only. I also acknowledge that my registration is
          not confirmed until the organiser verifies payment.
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-7 w-full rounded-xl border bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#111111]"
      >
        Continue to payment instructions
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-gray-500">
        Your registration is not confirmed until the organiser verifies payment.
      </p>
    </form>
  );
}
