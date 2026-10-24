'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRegistration } from '@/actions/registration';
import { useRouter, useSearchParams } from 'next/navigation';
import { RACE_CATEGORIES, type RaceCategoryId } from '@/lib/constants';
import { RegistrationSchema, type RegistrationInput } from '@/types/registration';

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedRace = searchParams.get('race');
  const initialRace = RACE_CATEGORIES.find((race) => race.id === requestedRace)?.id ?? '5km';

  const [raceId, setRaceId] = useState<RaceCategoryId>(initialRace);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRace = RACE_CATEGORIES.find((race) => race.id === raceId)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: 'prefer_not_to_say',
      raceCategory: initialRace,
      acceptedTerms: false as unknown as true,
    },
  });

  async function onSubmit(data: RegistrationInput) {
    try {
      setIsLoading(true);

      const response = await createRegistration({
        ...data,
        raceCategory: raceId,
      });

      if (response.status !== 201 || !response.data) {
        const message =
          typeof response.error === 'string'
            ? response.error
            : 'Please check your information and try again.';

        toast.error(message);
        return;
      }

      const params = new URLSearchParams({
        race: response.data.raceCategory,
        registration: response.data.id,
      });

      router.push(`/payments?${params.toString()}`);
    } catch (error) {
      console.error('REGISTRATION FORM ERROR:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
            Full name *
          </label>
          <input
            id="fullName"
            autoComplete="name"
            placeholder="Enter your full name"
            {...register('fullName')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            Email address *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register('email')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
            WhatsApp Number *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+266 ..."
            {...register('phone')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="mb-2 block text-sm font-semibold">
            Gender
          </label>
          <select
            id="gender"
            {...register('gender')}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
          >
            <option value="prefer_not_to_say">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-9 border-t border-gray-100 pt-7">
        <h2 className="font-extrabold">Choose your race category</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select one distance. Your entry fee is shown below.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {RACE_CATEGORIES.map((race) => (
            <label
              key={race.id}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                raceId === race.id
                  ? 'border-[#25D366] bg-green-50 ring-2 ring-green-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                value={race.id}
                checked={raceId === race.id}
                {...register('raceCategory', {
                  onChange: (event) => setRaceId(event.target.value as RaceCategoryId),
                })}
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
        {errors.raceCategory && (
          <p className="mt-2 text-xs text-red-600">{errors.raceCategory.message}</p>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">Selected entry fee</span>
          <span className="text-xl font-black text-[#111111]">M{selectedRace.fee}</span>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-gray-600">
        <input
          type="checkbox"
          {...register('acceptedTerms')}
          className="mt-1 h-4 w-4 accent-[#25D366]"
        />
        <span>
          I confirm that the details provided are accurate and understand that this information will
          be used for race registration purposes only. I also acknowledge that my registration is
          not confirmed until the organiser verifies payment.
        </span>
      </label>
      {errors.acceptedTerms && (
        <p className="mt-2 text-xs text-red-600">{errors.acceptedTerms.message}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-7 w-full rounded-xl border bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#111111] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Saving registration...' : 'Continue to payment instructions'}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-gray-500">
        Your registration is not confirmed until the organiser verifies payment.
      </p>
    </form>
  );
}
