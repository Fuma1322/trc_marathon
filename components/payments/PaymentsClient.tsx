'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Banknote,
  CheckCircle2,
  CircleAlert,
  Landmark,
  Send,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { PAYMENT_METHODS, RACE_CATEGORIES, type PaymentMethodId } from '@/lib/constants';
import { PAYMENT_DETAILS } from '@/lib/payment-details';

const methodIcons = {
  mpesa: Smartphone,
  'bank-transfer': Landmark,
  'e-wallet': Wallet,
  'instant-money': Send,
  cash: Banknote,
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="break-words text-sm font-bold text-[#111111] sm:text-right">{value}</span>
    </div>
  );
}

export default function PaymentsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raceId = searchParams.get('race');
  const race = RACE_CATEGORIES.find((item) => item.id === raceId) ?? RACE_CATEGORIES[1];
  const [method, setMethod] = useState<PaymentMethodId>('mpesa');
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const instructions = useMemo(() => {
    switch (method) {
      case 'mpesa':
        return PAYMENT_DETAILS.mpesa;
      case 'bank-transfer':
        return PAYMENT_DETAILS.bankTransfer;
      case 'e-wallet':
        return PAYMENT_DETAILS.eWallet;
      case 'instant-money':
        return PAYMENT_DETAILS.instantMoney;
      case 'cash':
        return PAYMENT_DETAILS.cash;
    }
  }, [method]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (method !== 'cash' && !reference.trim()) return;
    // Demo only: this does not send proof to a server or verify a transaction.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800">
          <CheckCircle2 size={34} />
        </div>
        <h2 className="mt-5 text-2xl font-black">Payment details recorded for this demo</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
          No payment information has been sent to TRC Race. In the live app, this step will submit
          your reference for organiser review.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-gray-50 p-5 text-left">
          <DetailRow label="Race category" value={race.name} />
          <DetailRow label="Entry fee" value={`M${race.fee}`} />
          <DetailRow
            label="Payment method"
            value={PAYMENT_METHODS.find((item) => item.id === method)?.name ?? method}
          />
          <DetailRow label="Status" value="Awaiting verification (demo)" />
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => router.push('/registration-success')}
            className="h-[44px] w-[120px] rounded-xl border bg-[#111111] text-white hover:bg-[#25d366]"
          >
            Continue
          </button>
          <button
            onClick={() => setSubmitted(false)}
            className="h-[44px] w-[250px] rounded-xl border bg-[#25d366] text-white hover:bg-[#111111]"
          >
            Back to instructions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
          Your selected race
        </p>
        <h2 className="mt-3 text-xl font-black">{race.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{race.distance} distance</p>
        <div className="mt-5 rounded-2xl bg-[#111111] p-5 text-white">
          <p className="text-sm text-gray-300">Entry fee</p>
          <p className="mt-1 text-3xl font-black text-[#25D366]">M{race.fee}</p>
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900">
          <CircleAlert size={20} className="mt-0.5 shrink-0" />
          <p className="text-xs leading-5">
            Use only the official payment details supplied by the organisers. The placeholders on
            this page must be replaced before launch.
          </p>
        </div>
      </aside>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-black">Select payment method</h2>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAYMENT_METHODS.map((item) => {
            const Icon = methodIcons[item.id];
            const active = method === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMethod(item.id);
                  setReference('');
                }}
                aria-pressed={active}
                className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition ${active ? 'border-[#25D366] bg-green-50 text-green-900 ring-2 ring-green-100' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <Icon size={22} />
                <span className="text-xs font-bold">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-green-50/70 p-5 sm:p-6">
          <h3 className="text-lg font-extrabold">
            {PAYMENT_METHODS.find((item) => item.id === method)?.name} instructions
          </h3>

          {method === 'mpesa' && (
            <>
              <DetailRow label="Recipient" value={PAYMENT_DETAILS.mpesa.recipient} />
              <DetailRow label="Till / reference" value={PAYMENT_DETAILS.mpesa.tillOrReference} />
            </>
          )}
          {method === 'bank-transfer' && (
            <>
              <DetailRow label="Bank" value={PAYMENT_DETAILS.bankTransfer.bankName} />
              <DetailRow label="Account name" value={PAYMENT_DETAILS.bankTransfer.accountName} />
              <DetailRow
                label="Account number"
                value={PAYMENT_DETAILS.bankTransfer.accountNumber}
              />
              <DetailRow label="Branch" value={PAYMENT_DETAILS.bankTransfer.branch} />
              <DetailRow label="Reference" value={PAYMENT_DETAILS.bankTransfer.reference} />
            </>
          )}
          {method === 'e-wallet' && (
            <>
              <DetailRow label="Provider" value={PAYMENT_DETAILS.eWallet.provider} />
              <DetailRow label="Recipient" value={PAYMENT_DETAILS.eWallet.recipient} />
              <DetailRow label="Wallet number" value={PAYMENT_DETAILS.eWallet.number} />
            </>
          )}
          {method === 'instant-money' && (
            <>
              <DetailRow label="Provider" value={PAYMENT_DETAILS.instantMoney.provider} />
              <DetailRow label="Recipient" value={PAYMENT_DETAILS.instantMoney.recipient} />
              <DetailRow label="Recipient number" value={PAYMENT_DETAILS.instantMoney.number} />
            </>
          )}
          {method === 'cash' && (
            <div className="py-3">
              <p className="text-sm font-semibold">Approved payment locations</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                {PAYMENT_DETAILS.cash.locations.map((location) => (
                  <li key={location}>{location}</li>
                ))}
              </ul>
            </div>
          )}

          <h4 className="mt-5 font-bold">Steps to follow</h4>
          <ol className="mt-3 space-y-3">
            {instructions.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-xs font-black text-[#111111]">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {method !== 'cash' && (
            <div>
              <label htmlFor="payment-reference" className="mb-2 block text-sm font-semibold">
                Transaction reference
              </label>
              <input
                id="payment-reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                required
                placeholder="Enter the reference from your confirmation"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
              />
              <p className="mt-2 text-xs leading-5 text-gray-500">
                Demo only: this reference stays in this page state and is not uploaded.
              </p>
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-xl border bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#111111]"
          >
            I&apos;ve followed these instructions
          </button>
          <p className="text-center text-xs leading-5 text-gray-500">
            Your entry is not confirmed until the organiser verifies your payment.
          </p>
        </form>
      </div>
    </div>
  );
}
