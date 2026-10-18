import { Suspense } from "react";
import type { Metadata } from "next";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata: Metadata = { title: "Runner Registration" };

export default function RegisterPage() {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">Step 1 of 2</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Runner registration</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">Enter your details and choose your race category. You will then see the payment instructions.</p>
        </div>
        <Suspense fallback={<div className="rounded-3xl border border-gray-200 bg-white p-8 text-sm text-gray-500">Loading registration form...</div>}>
          <RegistrationForm />
        </Suspense>
      </div>
    </section>
  );
}
