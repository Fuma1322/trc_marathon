import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function FrontLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <div className="pb-6 md:pb-0">
        <Footer />
      </div>
    </>
  );
}
