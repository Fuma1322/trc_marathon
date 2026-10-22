'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Badge from '@/components/ui/Badge';

type Status = 'Pending' | 'Verified' | 'Rejected';
const initialPayments = [
  {
    id: 'TRC-DEMO-001',
    runner: 'Demo Runner 01',
    method: 'M-Pesa',
    amount: 'M280',
    reference: 'DEMO12345',
    status: 'Pending' as Status,
  },
  {
    id: 'TRC-DEMO-002',
    runner: 'Demo Runner 02',
    method: 'Bank Transfer',
    amount: 'M220',
    reference: 'DEMO-BANK-22',
    status: 'Pending' as Status,
  },
  {
    id: 'TRC-DEMO-003',
    runner: 'Demo Runner 03',
    method: 'Cash',
    amount: 'M140',
    reference: 'Receipt pending',
    status: 'Verified' as Status,
  },
  {
    id: 'TRC-DEMO-004',
    runner: 'Demo Runner 04',
    method: 'E-Wallet',
    amount: 'M90',
    reference: 'DEMO-WALLET-90',
    status: 'Rejected' as Status,
  },
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState<'All' | Status>('All');

  function updateStatus(id: string, status: Status) {
    // Demo only: state changes in this browser session and are not saved.
    setPayments((current) =>
      current.map((payment) => (payment.id === id ? { ...payment, status } : payment))
    );
  }

  const visible = payments.filter((payment) => filter === 'All' || payment.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Payment verification</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review references and update demo statuses. Verify real transactions with the provider or
          bank before confirming payment.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(['All', 'Pending', 'Verified', 'Rejected'] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${filter === item ? 'bg-[#111111] text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4">Reference</th>
              <th className="px-5 py-4">Runner</th>
              <th className="px-5 py-4">Method</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions (demo)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.map((payment) => (
              <tr key={payment.id}>
                <td className="px-5 py-4 font-semibold">
                  {payment.id}
                  <span className="mt-1 block text-xs font-normal text-gray-500">
                    {payment.reference}
                  </span>
                </td>
                <td className="px-5 py-4">{payment.runner}</td>
                <td className="px-5 py-4">{payment.method}</td>
                <td className="px-5 py-4 font-bold">{payment.amount}</td>
                <td className="px-5 py-4">
                  <Badge
                    tone={
                      payment.status === 'Verified'
                        ? 'green'
                        : payment.status === 'Pending'
                          ? 'yellow'
                          : 'red'
                    }
                  >
                    {payment.status}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 text-xs"
                      disabled={payment.status === 'Verified'}
                      onClick={() => updateStatus(payment.id, 'Verified')}
                    >
                      <Check size={14} /> Verify
                    </button>
                    <button
                      className="px-3 py-2 text-xs"
                      disabled={payment.status === 'Rejected'}
                      onClick={() => updateStatus(payment.id, 'Rejected')}
                    >
                      <X size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-5 text-gray-500">
        Important: this table uses fictional data. Status changes are temporary and do not verify a
        real payment or persist to a database.
      </p>
    </div>
  );
}
