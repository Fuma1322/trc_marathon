import prisma from '@/lib/db';
import Badge from '@/components/ui/Badge';
import RegistrationApprovalButton from '../registration/RegistrationApprovalButton';

export const dynamic = 'force-dynamic';

function paymentTone(status: string) {
  switch (status) {
    case 'VERIFIED':
      return 'green';
    case 'REJECTED':
      return 'red';
    default:
      return 'yellow';
  }
}

function registrationTone(status: string) {
  switch (status) {
    case 'APPROVED':
      return 'green';
    case 'REJECTED':
      return 'red';
    default:
      return 'yellow';
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function RegistrationsTable() {
  const registrations = await prisma.runnerRegistration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
        <div>
          <h2 className="font-extrabold text-[#111111]">Recent registrations</h2>
          <p className="mt-1 text-xs text-gray-500">
            Live registrations from the TRC Race database.
          </p>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
          {registrations.length} registrations
        </span>
      </div>

      {registrations.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-semibold text-[#111111]">No registrations yet</p>
          <p className="mt-2 text-sm text-gray-500">New runner registrations will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-bold">Runner</th>
                <th className="px-5 py-4 font-bold">Category</th>
                <th className="px-5 py-4 font-bold">Entry fee</th>
                <th className="px-5 py-4 font-bold">Payment method</th>
                <th className="px-5 py-4 font-bold">Payment status</th>
                <th className="px-5 py-4 font-bold">Registration status</th>
                <th className="px-5 py-4 font-bold">Race number</th>
                <th className="px-5 py-4 font-bold">Actions</th>
                <th className="px-5 py-4 font-bold">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {registrations.map((runner) => (
                <tr key={runner.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <p className="font-bold text-[#111111]">{runner.fullName}</p>
                    <p className="mt-1 text-xs text-gray-500">{runner.email}</p>
                    <p className="mt-1 text-xs text-gray-500">{runner.phone}</p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {runner.raceCategory}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-bold text-[#111111]">
                    M{runner.entryFee}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {runner.paymentMethod
                      ? formatStatus(runner.paymentMethod.replaceAll('-', '_'))
                      : 'Not submitted'}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <Badge tone={paymentTone(runner.paymentStatus)}>
                      {formatStatus(runner.paymentStatus)}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <Badge tone={registrationTone(runner.registrationStatus)}>
                      {formatStatus(runner.registrationStatus)}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {runner.raceNumber ? (
                      <span className="rounded-lg bg-green-50 px-2.5 py-1.5 font-bold text-green-800">
                        {runner.raceNumber}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <RegistrationApprovalButton
                      registrationId={runner.id}
                      runnerName={runner.fullName}
                      paymentStatus={runner.paymentStatus}
                      registrationStatus={runner.registrationStatus}
                      raceNumber={runner.raceNumber}
                    />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                    {formatDate(runner.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-gray-100 px-5 py-3">
        <p className="text-xs leading-5 text-gray-500">
          Payment verification and registration approval are separate steps. Race numbers are
          assigned after approval.
        </p>
      </div>
    </section>
  );
}
