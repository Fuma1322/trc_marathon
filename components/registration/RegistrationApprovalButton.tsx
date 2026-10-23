'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, LoaderCircle, X } from 'lucide-react';
import { approveRunnerRegistration } from '@/actions/registration-approval';

type Props = {
  registrationId: string;
  runnerName: string;
  paymentStatus: string;
  registrationStatus: string;
  raceNumber: string | null;
};

export default function RegistrationApprovalButton({
  registrationId,
  runnerName,
  paymentStatus,
  registrationStatus,
  raceNumber,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [assignedNumber, setAssignedNumber] = useState('');
  const [isPending, startTransition] = useTransition();

  const canApprove =
    paymentStatus === 'VERIFIED' && registrationStatus === 'PENDING_APPROVAL' && !raceNumber;

  function handleApprove() {
    setError('');

    startTransition(async () => {
      const result = await approveRunnerRegistration(registrationId);

      if (!result.success) {
        setError(result.error ?? 'Approval failed.');
        return;
      }

      setAssignedNumber(result.raceNumber ?? '');
      setOpen(false);
      router.refresh();
    });
  }

  if (raceNumber || registrationStatus === 'APPROVED') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-800">
        <Check size={14} />
        Approved
      </span>
    );
  }

  if (registrationStatus === 'REJECTED') {
    return <span className="text-xs font-semibold text-red-700">Rejected</span>;
  }

  return (
    <>
      <div className="space-y-1">
        <button
          type="button"
          disabled={!canApprove}
          onClick={() => {
            setError('');
            setOpen(true);
          }}
          title={
            paymentStatus !== 'VERIFIED'
              ? 'Verify payment before approving registration'
              : 'Approve registration and assign a race number'
          }
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-[#111111] hover:brightness-95 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          <Check size={14} />
          Approve
        </button>

        {paymentStatus !== 'VERIFIED' && (
          <p className="text-xs text-gray-400">Payment not verified</p>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!isPending) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="approval-title" className="text-xl font-black">
                  Approve registration?
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  You are about to approve {runnerName} and assign a race number.
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                aria-label="Close approval modal"
                className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
              <p className="text-gray-500">Payment status</p>
              <p className="mt-1 font-bold text-green-800">Verified</p>
              <p className="mt-3 text-gray-500">Registration</p>
              <p className="mt-1 font-bold">{runnerName}</p>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleApprove}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#111111] disabled:opacity-50"
              >
                {isPending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                {isPending ? 'Approving...' : 'Confirm approval'}
              </button>
            </div>
          </section>
        </div>
      )}

      {assignedNumber && (
        <p role="status" className="mt-2 text-xs font-semibold text-green-800">
          Assigned race number: {assignedNumber}
        </p>
      )}
    </>
  );
}
