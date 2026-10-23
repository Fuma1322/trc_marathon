import StatsCards from '@/components/dashboard/StatsCards';
import { RACE_CATEGORIES } from '@/lib/constants';
import { requireOrganizer } from '@/lib/organizer-auth';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  try {
    await requireOrganizer();
  } catch {
    redirect('/login');
  }

  // Fetch live registration and verified-payment counts per race category.
  const counts = await Promise.all(
    RACE_CATEGORIES.map(async (race) => {
      const [total, paid] = await Promise.all([
        prisma.runnerRegistration.count({
          where: {
            raceCategory: race.id,
          },
        }),
        prisma.runnerRegistration.count({
          where: {
            raceCategory: race.id,
            paymentStatus: 'VERIFIED',
          },
        }),
      ]);

      return {
        id: race.id,
        total,
        paid,
      };
    })
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Dashboard overview</h1>
        <p className="mt-2 text-sm text-gray-500">
          Monitor registrations and payment review activity.
        </p>
      </div>

      <StatsCards />

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="font-extrabold">Race category progress</h2>
          <p className="mt-1 text-xs text-gray-500">
            Live registration and verified-payment statistics.
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {counts.map((item) => {
            const race = RACE_CATEGORIES.find((category) => category.id === item.id);

            const percent = item.total > 0 ? Math.round((item.paid / item.total) * 100) : 0;

            return (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{race?.name ?? item.id}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.paid} verified out of {item.total} registrations
                    </p>
                  </div>

                  <span className="text-sm font-black text-green-800">{percent}%</span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#25D366] transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
