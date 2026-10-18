import Link from 'next/link';
import ContactForm from '@/components/frontend/ContactForm';

const contactMethods = [
  {
    label: 'Email',
    value: 'fumamookho@gmail.com',
    href: 'mailto:fumamookho@gmail.com',
    description: 'For professional enquiries and collaborations.',
  },
  {
    label: 'Location',
    value: 'Lesotho',
    href: undefined,
    description: 'Available for relevant local and remote projects.',
  },
];

const socialLinks = [
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@cassy.ls31',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/cassydefuma.mookho',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/+26659388613',
  },
];

export default function ContactContent() {
  return (
    <main className="min-h-screen bg-[#F6F0E8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#271522] px-6 py-24 text-[#F6F0E8] sm:px-10 lg:px-16 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[#C78691]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C5A46D]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A46D]">Contact</p>
          </div>

          <h1 className="max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Let&apos;s start
            <br />
            <span className="italic text-[#C78691]">a conversation.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Have a production in mind, a creative collaboration to discuss, or simply want to
            connect? I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact information and form */}
      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Direct contact */}
          <aside>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#9D7750]">Get in touch</p>
            </div>

            <h2 className="font-serif text-3xl text-[#271522] sm:text-4xl">I&apos;m all ears.</h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#171719]/65">
              For project enquiries, production opportunities, collaborations, or professional
              connections, use the details below.
            </p>

            <div className="mt-10 divide-y divide-[#271522]/10 border-y border-[#271522]/10">
              {contactMethods.map((method) => (
                <div key={method.label} className="py-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9D7750]">
                    {method.label}
                  </p>

                  {method.href ? (
                    <a
                      href={method.href}
                      className="mt-3 inline-block break-all font-serif text-xl text-[#271522] transition-colors hover:text-[#9D6875]"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="mt-3 font-serif text-xl text-[#271522]">{method.value}</p>
                  )}

                  <p className="mt-2 text-sm leading-6 text-[#171719]/55">{method.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9D7750]">Find me online</p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#271522]/75 underline decoration-[#C5A46D] underline-offset-4 transition-colors hover:text-[#9D6875]"
                  >
                    {social.label} ↗
                  </a>
                ))}
              </div>

              <p className="mt-4 text-xs leading-6 text-[#171719]/45">
                Replace these example links with Mookho&apos;s actual professional profiles before
                publishing.
              </p>
            </div>
          </aside>

          {/* Enquiry form */}
          <div className="border border-[#271522]/10 bg-white/40 p-6 sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9D7750]">Send an enquiry</p>

              <h2 className="mt-3 font-serif text-3xl text-[#271522]">Tell me about it.</h2>

              <p className="mt-3 text-sm leading-6 text-[#171719]/60">
                Share a few details and let&apos;s start from there.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="bg-white/60 px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xl italic text-[#271522]">
            Every great project starts somewhere.
          </p>

          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#271522] transition-colors hover:text-[#9D6875]"
          >
            Explore my work
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
