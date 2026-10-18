import Link from 'next/link';

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@cassy.ls31' },
  { label: 'Facebook', href: 'https://www.facebook.com/cassydefuma.mookho' },
  { label: 'WhatsApp', href: 'https://wa.me/+26659388613' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#271522] text-[#F6F0E8]">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr] lg:gap-16">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center border border-[#C5A46D]/60 text-lg font-semibold tracking-tight text-[#C5A46D]">
                MF
              </span>

              <span className="font-serif text-2xl tracking-wide">Mookho Fuma</span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#F6F0E8]/65">
              Bringing stories to life through film, television, and visual storytelling. Based in
              Lesotho, inspired by the stories worth telling.
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[#C78691]">
              Film · Television · Storytelling
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Explore
            </h2>

            <nav aria-label="Footer navigation" className="mt-6 flex flex-col items-start gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#F6F0E8]/70 transition-colors duration-200 hover:text-[#C78691]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact and social links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Let&apos;s Connect
            </h2>

            <p className="mt-6 max-w-xs text-sm leading-7 text-[#F6F0E8]/65">
              Have a story to tell or a production in mind? Let&apos;s start a conversation.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-3 border-b border-[#C5A46D]/60 pb-2 text-sm text-[#F6F0E8] transition-colors hover:border-[#C78691] hover:text-[#C78691]"
            >
              Get in touch
              <span aria-hidden="true">↗</span>
            </Link>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label}`}
                  className="text-xs text-[#F6F0E8]/55 transition-colors hover:text-[#C78691]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-7 text-xs text-[#F6F0E8]/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide text-[#25d366]/60">
            © {currentYear} All rights reserved. Crafted by MPlug (Pty) Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
