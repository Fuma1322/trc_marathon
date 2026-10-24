'use client';

import { Printer } from 'lucide-react';

export default function PrintTicketButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#111111] transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
    >
      <Printer size={17} />
      Print / Save PDF
    </button>
  );
}
