import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function FrontLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}
