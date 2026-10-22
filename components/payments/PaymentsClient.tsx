'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Banknote, CircleAlert, Landmark, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

import { PAYMENT_METHODS, RACE_CATEGORIES, type PaymentMethodId } from '@/lib/constants';
import { PAYMENT_DETAILS } from '@/lib/payment-details';
import { submitRegistrationPayment } from '@/actions/payments';

const methodIcons = {
  mpesa: Smartphone,
  'bank-transfer': Landmark,
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
  const registrationId = searchParams.get('registration');

  const race = RACE_CATEGORIES.find((item) => item.id === raceId) ?? RACE_CATEGORIES[1];

  const [method, setMethod] = useState<PaymentMethodId | ''>('');
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  const instructions = !method
    ? null
    : method === 'mpesa'
      ? PAYMENT_DETAILS.mpesa
      : method === 'bank-transfer'
        ? PAYMENT_DETAILS.bankTransfer
        : PAYMENT_DETAILS.cash;

  const selectedMethodName = PAYMENT_METHODS.find((item) => item.id === method)?.name ?? '';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!registrationId) {
      toast.error('Your registration reference is missing. Please register first.');
      return;
    }

    if (!method) {
      toast.error('Please select a payment method.');
      return;
    }

    if (method !== 'cash' && !reference.trim()) {
      toast.error('Please enter your transaction reference.');
      return;
    }

    if (!hasAcceptedDisclaimer) {
      toast.error('Please accept the payment disclaimer before continuing.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await submitRegistrationPayment({
        registrationId,
        method,
        reference: method === 'cash' ? undefined : reference.trim(),
      });

      if (response.status !== 200 || !response.data) {
        toast.error(
          typeof response.error === 'string'
            ? response.error
            : 'Unable to submit your payment details.'
        );
        return;
      }

      toast.success('Your payment details have been submitted.');

      router.replace(`/registration-success?registration=${encodeURIComponent(response.data.id)}`);
    } catch (error) {
      console.error('PAYMENT FORM ERROR:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      {/* Selected race summary */}
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
            Use only the official payment details supplied by the organisers. Your entry is subject
            to payment verification and organiser approval. A racing number will only be assigned
            after the required checks are complete.
          </p>
        </div>
      </aside>

      {/* Payment instructions and submission form */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-black">Select payment method</h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose how you intend to pay and follow the instructions below.
        </p>

        {/* Payment method selection */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAYMENT_METHODS.map((item) => {
            const Icon = methodIcons[item.id as keyof typeof methodIcons];
            const active = method === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMethod(item.id);
                  setReference('');
                  setHasAcceptedDisclaimer(false);
                }}
                aria-pressed={active}
                className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition ${
                  active
                    ? 'border-[#25D366] bg-green-50 text-green-900 ring-2 ring-green-100'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon size={22} />}
                <span className="text-xs font-bold">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Payment instructions */}
        {method && instructions && (
          <div className="mt-6 rounded-2xl bg-green-50/70 p-5 sm:p-6">
            <h3 className="text-lg font-extrabold">{selectedMethodName} instructions</h3>

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

            {method === 'cash' && (
              <div className="py-3">
                <p className="text-sm font-semibold">Approved payment locations</p>

                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                  {PAYMENT_DETAILS.cash.locations.map((location) => (
                    <li key={location}>{location}</li>
                  ))}
                </ul>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Pay at an approved location and keep your receipt as proof of payment. You do not
                  need to enter a transaction reference for cash payments.
                </p>
              </div>
            )}

            <h4 className="mt-5 font-bold">Steps to follow</h4>

            <ol className="mt-3 space-y-3">
              {instructions.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-xs font-black text-[#111111]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Payment submission form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Reference is required only for electronic payments */}
          {method && method !== 'cash' && (
            <div>
              <label htmlFor="payment-reference" className="mb-2 block text-sm font-semibold">
                Transaction reference *
              </label>

              <input
                id="payment-reference"
                name="paymentReference"
                type="text"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                required
                maxLength={100}
                autoComplete="off"
                placeholder="Enter the reference from your confirmation"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-green-100"
              />

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Enter the reference shown on your transaction confirmation. The organiser will
                verify your payment separately.
              </p>
            </div>
          )}

          {/* Cash payment notice */}
          {method === 'cash' && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#111111]">Paying with cash?</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Follow the approved cash payment instructions and keep your receipt. No transaction
                reference is required here. Your registration will remain pending until the
                organiser confirms receipt of your payment.
              </p>
            </div>
          )}

          {/* Disclaimer and mandatory acceptance */}
          {method && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 shrink-0 text-amber-700" size={21} />

                <div>
                  <h3 className="font-bold text-amber-950">Important payment disclaimer</h3>

                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    Please pay the correct entry fee using the official payment details provided by
                    the organisers. Submitting your registration or payment details does not mean
                    your payment has been received or verified.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    Your registration will remain pending until the organisers confirm your payment
                    and approve your entry. You must complete payment and have it confirmed to
                    qualify for a racing number. A race number will only be assigned after the
                    required checks are complete.
                  </p>
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3 border-t border-amber-200 pt-4">
                <input
                  type="checkbox"
                  checked={hasAcceptedDisclaimer}
                  onChange={(event) => setHasAcceptedDisclaimer(event.target.checked)}
                  required
                  className="mt-1 h-4 w-4 accent-[#25D366]"
                />

                <span className="text-sm font-semibold leading-6 text-amber-950">
                  I have read and understood the payment disclaimer. I understand that I must pay
                  and have my payment confirmed before I can receive a racing number.
                </span>
              </label>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !registrationId ||
              !method ||
              (method !== 'cash' && !reference.trim()) ||
              !hasAcceptedDisclaimer
            }
            className="w-full rounded-xl border bg-[#25D366] px-4 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#111111] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting payment details...' : 'Submit payment details'}
          </button>

          {!registrationId && (
            <p className="text-center text-xs leading-5 text-red-600">
              Your registration ID is missing. Please complete the registration form before
              continuing.
            </p>
          )}

          <p className="text-center text-xs leading-5 text-gray-500">
            Your registration is not approved until the organiser verifies your payment. A racing
            number will be assigned after approval.
          </p>
        </form>
      </div>
    </div>
  );
}
