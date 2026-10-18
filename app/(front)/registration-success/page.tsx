import Link from "next/link";
import { CheckCircle2, ClipboardCheck, Home } from "lucide-react";

export default function RegistrationSuccessPage() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-800"><CheckCircle2 size={42} /></div>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">TRC Race</p>
        <h1 className="mt-3 text-3xl font-black">Thank you for taking the first step!</h1>
        <p className="mt-4 text-sm leading-7 text-gray-600">This is a frontend confirmation screen. Your registration and payment have not been saved or verified. In the live app, this page will show your registration reference and current payment status.</p>
        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-gray-50 p-4 text-left">
          <ClipboardCheck size={21} className="mt-0.5 shrink-0 text-green-700" />
          <p className="text-sm leading-6 text-gray-600">Keep your payment confirmation or cash receipt. Your entry should only be treated as confirmed after the organiser verifies payment.</p>
        </div>
        <Link href="/" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#111111] hover:bg-[#1fbd59]"><Home size={17} /> Back to home</Link>
      </div>
    </section>
  );
}
