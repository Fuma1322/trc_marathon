import type { ReactNode } from 'react';

export default function FrontLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}

      <main>{children}</main>

      <div className="pb-6 md:pb-0">{/* <Footer /> */}</div>
    </>
  );
}
