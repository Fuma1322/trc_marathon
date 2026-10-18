import Badge from "@/components/ui/Badge";

const registrations = [
  { name: "Demo Runner 01", category: "21 km", amount: "M280", status: "Verified", date: "2026-10-18" },
  { name: "Demo Runner 02", category: "10 km", amount: "M220", status: "Pending", date: "2026-10-18" },
  { name: "Demo Runner 03", category: "5 km", amount: "M140", status: "Verified", date: "2026-10-17" },
  { name: "Demo Runner 04", category: "2.5 km", amount: "M90", status: "Rejected", date: "2026-10-17" },
  { name: "Demo Runner 05", category: "10 km", amount: "M220", status: "Pending", date: "2026-10-16" },
];

export default function RegistrationsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
        <div><h2 className="font-extrabold">Recent registrations</h2><p className="mt-1 text-xs text-gray-500">Illustrative records for layout preview</p></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4 font-bold">Runner</th><th className="px-5 py-4 font-bold">Category</th><th className="px-5 py-4 font-bold">Fee</th><th className="px-5 py-4 font-bold">Payment status</th><th className="px-5 py-4 font-bold">Date</th></tr></thead>
          <tbody className="divide-y divide-gray-100">{registrations.map((row) => <tr key={row.name} className="hover:bg-gray-50/70"><td className="px-5 py-4 font-semibold text-[#111111]">{row.name}</td><td className="px-5 py-4 text-gray-600">{row.category}</td><td className="px-5 py-4 font-semibold">{row.amount}</td><td className="px-5 py-4"><Badge tone={row.status === "Verified" ? "green" : row.status === "Pending" ? "yellow" : "red"}>{row.status}</Badge></td><td className="px-5 py-4 text-gray-500">{row.date}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
