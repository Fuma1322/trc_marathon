import RegistrationsTable from "@/components/dashboard/RegistrationsTable";

export default function RegistrationsPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-black tracking-tight">Registrations</h1><p className="mt-2 text-sm text-gray-500">Review runner registrations and selected categories.</p></div><RegistrationsTable /></div>;
}
