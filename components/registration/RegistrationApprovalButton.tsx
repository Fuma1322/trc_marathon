'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { resendRaceTicketEmail } from '@/actions/ticket-email';
import { Check, LoaderCircle, Mail, RefreshCw, X } from 'lucide-react';
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
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState<'success' | 'warning'>('success');
  const [assignedNumber, setAssignedNumber] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();

  const isApproved = registrationStatus === 'APPROVED' && Boolean(raceNumber);

  const canApprove =
    paymentStatus === 'VERIFIED' && registrationStatus === 'PENDING_APPROVAL' && !raceNumber;

  function handleApprove() {
    setError('');
    setNotice('');

    startTransition(async () => {
      const result = await approveRunnerRegistration(registrationId);

      if (!result.success) {
        setError(result.error ?? 'Approval failed.');
        return;
      }

      setAssignedNumber(result.raceNumber ?? '');
      setOpen(false);

      setNotice(
        result.emailSent
          ? 'Registration approved and ticket emailed successfully.'
          : 'Registration approved. Ticket email could not be sent; you can retry below.'
      );

      setNoticeType(result.emailSent ? 'success' : 'warning');

      router.refresh();
    });
  }

  function handleResendTicket() {
    setNotice('');
    setError('');

    startResendTransition(async () => {
      const result = await resendRaceTicketEmail(registrationId);

      if (!result.success) {
        setNotice(result.error ?? 'Unable to resend ticket email.');
        setNoticeType('warning');
        return;
      }

      setNotice(result.message ?? 'Ticket email sent successfully.');
      setNoticeType('success');

      router.refresh();
    });
  }

  if (registrationStatus === 'REJECTED') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
        <X size={13} />
        Rejected
      </span>
    );
  }

  if (isApproved) {
    return (
      <div className="min-w-[180px] space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
            <Check size={13} />
            Approved
          </span>

          <span className="text-xs font-bold text-slate-700">{raceNumber}</span>
        </div>

        <button
          type="button"
          disabled={isResending}
          onClick={handleResendTicket}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-bold text-green-800 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending ? (
            <LoaderCircle size={14} className="animate-spin" />
          ) : (
            <RefreshCw size={14} />
          )}

          {isResending ? 'Sending ticket...' : 'Resend ticket'}
        </button>

        {notice && (
          <p
            role="status"
            className={`max-w-xs text-xs leading-relaxed ${
              noticeType === 'success' ? 'text-green-700' : 'text-amber-700'
            }`}
          >
            {notice}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        <button
          type="button"
          disabled={!canApprove || isPending}
          onClick={() => {
            setError('');
            setNotice('');
            setOpen(true);
          }}
          title={
            paymentStatus !== 'VERIFIED'
              ? 'Verify payment before approving registration'
              : 'Approve registration and assign a race number'
          }
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-[#111111] transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          <Check size={14} />
          Approve
        </button>

        {paymentStatus !== 'VERIFIED' && (
          <p className="text-xs text-gray-400">Payment not verified</p>
        )}

        {notice && (
          <p
            role="status"
            className={`max-w-xs text-xs leading-relaxed ${
              noticeType === 'success' ? 'text-green-700' : 'text-amber-700'
            }`}
          >
            {notice}
          </p>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!isPending) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-title"
            className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <Mail size={21} />
                </span>

                <h2
                  id="approval-title"
                  className="mt-4 text-xl font-black tracking-tight text-slate-900"
                >
                  Approve registration?
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Approving {runnerName} will allocate a race number and generate their official
                  race ticket.
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                aria-label="Close approval modal"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Payment status
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-bold text-green-800">
                  <Check size={15} />
                  Verified
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Racer
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">{runnerName}</p>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-green-700" />
                <div>
                  <p className="text-sm font-bold text-green-900">Digital race ticket</p>
                  <p className="mt-1 text-xs leading-relaxed text-green-800">
                    The system will generate a unique ticket and attempt to email it to the racer's
                    registered email address after approval.
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleApprove}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-[#111111] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
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
