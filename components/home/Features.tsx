import { ShieldCheck, Users, WalletCards } from "lucide-react";

const features = [
  { icon: Users, title: "For every level", description: "Choose the distance that suits your pace and goals." },
  { icon: WalletCards, title: "Clear payment steps", description: "Follow the instructions for your preferred manual payment method." },
  { icon: ShieldCheck, title: "Confirmation process", description: "Keep your proof of payment while the organisers review your registration." },
];

export default function Features() {
  return (
    <section className="border-y border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800"><Icon size={23} /></div>
              <div>
                <h3 className="font-extrabold text-[#111111]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
