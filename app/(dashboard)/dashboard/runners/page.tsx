import prisma from '@/lib/db';
import { RACE_CATEGORIES } from '@/lib/constants';
import { requireOrganizer } from '@/lib/organizer-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RunnersPage() {
  try {
    await requireOrganizer();
  } catch {
    redirect('/login');
  }

  const runners = await prisma.runnerRegistration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      raceCategory: true,
      paymentStatus: true,
      registrationStatus: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Runners</h1>
        <p className="mt-2 text-sm text-gray-500">
          Runner directory showing all registered participants.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">Total runners</p>
          <p className="mt-1 text-xl font-black">{runners.length}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">Verified payments</p>
          <p className="mt-1 text-xl font-black">
            {runners.filter((runner) => runner.paymentStatus === 'VERIFIED').length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Race category</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Registration</th>
              <th className="px-5 py-4">Registered on</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {runners.map((runner) => {
              const race = RACE_CATEGORIES.find((category) => category.id === runner.raceCategory);

              return (
                <tr key={runner.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold">{runner.fullName}</td>

                  <td className="px-5 py-4 text-gray-600">{runner.email}</td>

                  <td className="px-5 py-4 text-gray-600">{runner.phone}</td>

                  <td className="px-5 py-4">{race?.name ?? runner.raceCategory}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        runner.paymentStatus === 'VERIFIED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {runner.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {runner.registrationStatus.replaceAll('_', ' ')}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {new Date(runner.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              );
            })}

            {runners.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-gray-500">
                  No runners have registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
