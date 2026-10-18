import { Banknote, CheckCircle2, Clock3, Users } from "lucide-react";

const stats = [
  { label: "Total registrations", value: "248", note: "Demo data", icon: Users, tone: "bg-green-100 text-green-800" },
  { label: "Payments verified", value: "186", note: "75% of entries", icon: CheckCircle2, tone: "bg-blue-100 text-blue-800" },
  { label: "Awaiting review", value: "42", note: "Needs attention", icon: Clock3, tone: "bg-amber-100 text-amber-800" },
  { label: "Fees recorded", value: "M46,500", note: "Illustrative total", icon: Banknote, tone: "bg-purple-100 text-purple-800" },
];

export default function StatsCards() {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, note, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex items-center justify-between gap-3"><p className="text-sm text-gray-500">{label}</p><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></span></div><p className="mt-4 text-2xl font-black text-[#111111]">{value}</p><p className="mt-1 text-xs text-gray-500">{note}</p></article>)}</div>;
}
