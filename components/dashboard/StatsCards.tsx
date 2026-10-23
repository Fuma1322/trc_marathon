import prisma from '@/lib/db';
import StatsAutoRefresh from './StatsAutoRefresh';
import { Banknote, CheckCircle2, Clock3, Users } from 'lucide-react';

export default async function StatsCards() {
  const [totalRegistrations, verifiedPayments, awaitingReview, verifiedEntries] = await Promise.all(
    [
      // All registrations in the database.
      prisma.runnerRegistration.count(),

      // Registrations with verified payments.
      prisma.runnerRegistration.count({
        where: {
          paymentStatus: 'VERIFIED',
        },
      }),

      // Registrations awaiting organiser review.
      prisma.runnerRegistration.count({
        where: {
          paymentStatus: 'PENDING',
          registrationStatus: 'PENDING_APPROVAL',
        },
      }),

      // Entry fees for verified payments only.
      prisma.runnerRegistration.findMany({
        where: {
          paymentStatus: 'VERIFIED',
        },
        select: {
          entryFee: true,
        },
      }),
    ]
  );

  const feesRecorded = verifiedEntries.reduce(
    (total, registration) => total + registration.entryFee,
    0
  );

  const verifiedPercentage =
    totalRegistrations > 0 ? Math.round((verifiedPayments / totalRegistrations) * 100) : 0;

  const stats = [
    {
      label: 'Total registrations',
      value: totalRegistrations.toLocaleString(),
      note: 'Registered runners',
      icon: Users,
      tone: 'bg-green-100 text-green-800',
    },
    {
      label: 'Payments verified',
      value: verifiedPayments.toLocaleString(),
      note: `${verifiedPercentage}% of registrations`,
      icon: CheckCircle2,
      tone: 'bg-blue-100 text-blue-800',
    },
    {
      label: 'Awaiting review',
      value: awaitingReview.toLocaleString(),
      note: 'Needs attention',
      icon: Clock3,
      tone: 'bg-amber-100 text-amber-800',
    },
    {
      label: 'Fees recorded',
      value: `M${feesRecorded.toLocaleString()}`,
      note: 'Verified payments only',
      icon: Banknote,
      tone: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <>
      <StatsAutoRefresh />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <article key={label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">{label}</p>

              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={20} />
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-[#111111]">{value}</p>

            <p className="mt-1 text-xs text-gray-500">{note}</p>
          </article>
        ))}
      </div>
    </>
  );
}
