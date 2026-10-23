import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { requireOrganizer } from '@/lib/organizer-auth';
import PaymentReviewTable from '@/components/payments/PaymentReviewTable';

export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
  try {
    await requireOrganizer();
  } catch {
    redirect('/login');
  }

  const registrations = await prisma.runnerRegistration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      raceCategory: true,
      entryFee: true,
      paymentMethod: true,
      paymentReference: true,
      paymentStatus: true,
      registrationStatus: true,
      createdAt: true,
    },
  });

  // Include cash payments even though they have no transaction reference.
  // Exclude registrations where the runner has not submitted payment details.
  const payments = registrations
    .filter((registration) => registration.paymentMethod !== null)
    .map((registration) => ({
      ...registration,
      createdAt: registration.createdAt,
    }));

  const pendingCount = payments.filter((payment) => payment.paymentStatus === 'PENDING').length;

  const verifiedCount = payments.filter((payment) => payment.paymentStatus === 'VERIFIED').length;

  const rejectedCount = payments.filter((payment) => payment.paymentStatus === 'REJECTED').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Payment verification</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review submitted payment details and record verification decisions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 bg-white p-5">
          <p className="text-sm text-gray-500">Pending review</p>
          <p className="mt-2 text-2xl font-black text-amber-700">{pendingCount}</p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-white p-5">
          <p className="text-sm text-gray-500">Verified payments</p>
          <p className="mt-2 text-2xl font-black text-green-700">{verifiedCount}</p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-white p-5">
          <p className="text-sm text-gray-500">Rejected payments</p>
          <p className="mt-2 text-2xl font-black text-red-700">{rejectedCount}</p>
        </div>
      </div>

      <PaymentReviewTable payments={payments} />

      <p className="text-xs leading-5 text-gray-500">
        Confirm M-Pesa and bank transfers against the provider or bank records. Verify cash only
        after receiving it. Recording a decision here does not independently confirm that money was
        received.
      </p>
    </div>
  );
}
