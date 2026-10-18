import { RACE_CATEGORIES } from "@/lib/constants";

const runners = [
  { name: "Demo Runner 01", email: "runner01@example.test", phone: "+266 0000 0001", race: "21km" },
  { name: "Demo Runner 02", email: "runner02@example.test", phone: "+266 0000 0002", race: "10km" },
  { name: "Demo Runner 03", email: "runner03@example.test", phone: "+266 0000 0003", race: "5km" },
  { name: "Demo Runner 04", email: "runner04@example.test", phone: "+266 0000 0004", race: "2.5km" },
];

export default function RunnersPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-black tracking-tight">Runners</h1><p className="mt-2 text-sm text-gray-500">Runner directory preview. All displayed details are fictitious demo data.</p></div><div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Phone</th><th className="px-5 py-4">Race category</th></tr></thead><tbody className="divide-y divide-gray-100">{runners.map((runner) => <tr key={runner.email}><td className="px-5 py-4 font-semibold">{runner.name}</td><td className="px-5 py-4 text-gray-600">{runner.email}</td><td className="px-5 py-4 text-gray-600">{runner.phone}</td><td className="px-5 py-4">{RACE_CATEGORIES.find((r) => r.id === runner.race)?.name}</td></tr>)}</tbody></table></div></div>;
}
