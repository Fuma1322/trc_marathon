import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ClipboardCheck, Home } from 'lucide-react';

import prisma from '@/lib/db';
import { RACE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { fireConfetti } from '@/components/ui/confetti-demo';

type Props = {
  searchParams: {
    registration?: string;
  };
};

export default async function RegistrationSuccessPage({ searchParams }: Props) {
  const registrationId = searchParams.registration;

  if (!registrationId) notFound();

  const registration = await prisma.runnerRegistration.findUnique({
    where: { id: registrationId },
  });

  if (!registration || !registration.paymentMethod) notFound();

  const race = RACE_CATEGORIES.find((item) => item.id === registration.raceCategory);

  const paymentMethod = PAYMENT_METHODS.find((item) => item.id === registration.paymentMethod);

  return (
    <section className="flex min-h-[65vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-800">
          <CheckCircle2 size={42} />
        </div>

        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
          TRC Race
        </p>

        <h1 className="mt-3 text-3xl font-black">Thank you, {registration.fullName}!</h1>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          Your registration details have been submitted successfully. Keep your registration
          reference for future enquiries.
        </p>

        <div className="mt-7 rounded-2xl bg-gray-50 p-5 text-left">
          <h2 className="mb-3 text-lg font-extrabold">Your registration details</h2>

          <div className="space-y-3 text-sm">
            <Detail label="Full name" value={registration.fullName} />
            <Detail label="Race category" value={race?.name ?? registration.raceCategory} />
            <Detail label="Entry fee" value={`M${registration.entryFee}`} />
            <Detail
              label="Payment method"
              value={paymentMethod?.name ?? registration.paymentMethod}
            />
            {registration.paymentReference && (
              <Detail label="Transaction reference" value={registration.paymentReference} />
            )}
            <Detail label="Payment status" value="Pending verification" />
            <Detail label="Registration status" value="Pending approval" />
            <Detail label="Race number" value={registration.raceNumber ?? 'Not assigned yet'} />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-left">
          <ClipboardCheck className="mt-0.5 shrink-0 text-green-700" size={21} />
          <p className="text-sm leading-6 text-gray-700">
            Keep your payment confirmation or cash receipt. Your race entry is not approved until
            the organiser completes the required checks. Your race number will be displayed when it
            is assigned.
          </p>
        </div>
        <Link href="/">
          <button
            onClick={fireConfetti}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#111111] transition hover:bg-[#1fbd59]"
          >
            <Home size={17} />
            Finish
          </button>
        </Link>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-200 pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="break-all font-semibold text-[#111111] sm:max-w-[65%] sm:text-right">
        {value}
      </span>
    </div>
  );
}
