import StatsCards from '@/components/dashboard/StatsCards';
import RegistrationsTable from '@/components/dashboard/RegistrationsTable';
import { RACE_CATEGORIES } from '@/lib/constants';
import { requireOrganizer } from '@/lib/organizer-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const counts = [
  { id: '2.5km', total: 68, paid: 52 },
  { id: '5km', total: 76, paid: 58 },
  { id: '10km', total: 64, paid: 49 },
  { id: '21km', total: 40, paid: 27 },
];

export default async function DashboardPage() {
  try {
    await requireOrganizer();
  } catch {
    redirect('/login');
  }

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
            Illustrative counts — replace with database values later.
          </p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {counts.map((item) => {
            const race = RACE_CATEGORIES.find((r) => r.id === item.id)!;
            const percent = Math.round((item.paid / item.total) * 100);
            return (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{race.name}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.paid} verified out of {item.total} registrations
                    </p>
                  </div>
                  <span className="text-sm font-black text-green-800">{percent}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#25D366]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <RegistrationsTable />
    </div>
  );
}
