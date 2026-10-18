import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentsClient from "@/components/payments/PaymentsClient";

export const metadata: Metadata = { title: "Payment Instructions" };

export default function PaymentsPage() {
  return (
    <section className="min-h-[70vh] bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">Step 2 of 2</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Complete your payment</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">Choose a payment method and follow its instructions carefully. Always confirm the recipient and amount before sending money.</p>
        </div>
        <Suspense fallback={<div className="rounded-3xl border border-gray-200 bg-white p-8 text-sm text-gray-500">Loading payment instructions...</div>}>
          <PaymentsClient />
        </Suspense>
      </div>
    </section>
  );
}
