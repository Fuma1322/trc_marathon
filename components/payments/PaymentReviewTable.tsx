'use client';

import Badge from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Check, X, Pencil, LoaderCircle } from 'lucide-react';
import { reviewRegistrationPayment } from '@/actions/payment-review';

type PaymentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
type FilterStatus = 'ALL' | PaymentStatus;

type Payment = {
  id: string;
  fullName: string;
  email: string;
  raceCategory: string;
  entryFee: number;
  paymentMethod: string | null;
  paymentReference: string | null;
  paymentStatus: string;
  registrationStatus: string;
  createdAt: Date;
};

type Props = {
  payments: Payment[];
};

function methodLabel(method: string | null) {
  if (!method) return 'Not submitted';

  const labels: Record<string, string> = {
    mpesa: 'M-Pesa',
    'bank-transfer': 'Bank Transfer',
    cash: 'Cash',
  };

  return labels[method] ?? method;
}

function statusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function PaymentReviewTable({ payments }: Props) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterStatus>('ALL');
  const [selected, setSelected] = useState<Payment | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const visible = payments.filter((payment) =>
    filter === 'ALL' ? true : payment.paymentStatus === filter
  );

  function review(decision: 'VERIFIED' | 'REJECTED') {
    if (!selected) return;

    setError('');
    setSuccess('');

    const payment = selected;

    startTransition(async () => {
      const result = await reviewRegistrationPayment(payment.id, decision);

      if (!result.success) {
        setError(result.error ?? 'Unable to update the payment.');
        return;
      }

      setSelected(null);
      setSuccess(
        decision === 'VERIFIED'
          ? `Payment for ${payment.fullName} has been verified.`
          : `Payment for ${payment.fullName} has been rejected.`
      );

      router.refresh();
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['ALL', 'All'],
            ['PENDING', 'Pending'],
            ['VERIFIED', 'Verified'],
            ['REJECTED', 'Rejected'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === value
                ? 'bg-[#111111] text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
            <span className="ml-2 opacity-70">
              {value === 'ALL'
                ? payments.length
                : payments.filter((p) => p.paymentStatus === value).length}
            </span>
          </button>
        ))}
      </div>

      {error && !selected && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">
          {success}
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4">Registration / Reference</th>
              <th className="px-5 py-4">Runner</th>
              <th className="px-5 py-4">Method</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visible.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-semibold">
                  {payment.id}
                  <span className="mt-1 block max-w-[220px] break-all text-xs font-normal text-gray-500">
                    {payment.paymentReference || 'No transaction reference'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <p className="font-semibold">{payment.fullName}</p>
                  <p className="mt-1 text-xs text-gray-500">{payment.email}</p>
                </td>

                <td className="px-5 py-4">{methodLabel(payment.paymentMethod)}</td>

                <td className="px-5 py-4 font-bold">M{payment.entryFee.toLocaleString()}</td>

                <td className="px-5 py-4">
                  <Badge
                    tone={
                      payment.paymentStatus === 'VERIFIED'
                        ? 'green'
                        : payment.paymentStatus === 'REJECTED'
                          ? 'red'
                          : 'yellow'
                    }
                  >
                    {statusLabel(payment.paymentStatus)}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  {payment.paymentStatus === 'PENDING' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(payment);
                        setError('');
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}

            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-gray-500">
                  No payments found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!isPending) {
              setSelected(null);
              setError('');
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="payment-modal-title" className="text-xl font-black">
                  Review payment
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Check the submitted details before making a decision.
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  setSelected(null);
                  setError('');
                }}
                aria-label="Close modal"
                className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Runner</span>
                <span className="text-right font-semibold">{selected.fullName}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Email</span>
                <span className="break-all text-right">{selected.email}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Race category</span>
                <span className="text-right font-semibold">{selected.raceCategory}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold">M{selected.entryFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Payment method</span>
                <span className="text-right font-semibold">
                  {methodLabel(selected.paymentMethod)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Transaction reference</span>
                <span className="max-w-[60%] break-all text-right font-semibold">
                  {selected.paymentReference || 'Not provided'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              Verify the transaction with the payment provider or bank before confirming. A cash
              payment should only be verified after the organiser has received the money.
            </p>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isPending}
                onClick={() => review('REJECTED')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                {isPending ? <LoaderCircle size={16} className="animate-spin" /> : <X size={16} />}
                Reject payment
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => review('VERIFIED')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#111111] hover:brightness-95 disabled:opacity-50"
              >
                {isPending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                Verify payment
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
