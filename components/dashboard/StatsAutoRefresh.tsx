'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StatsAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [router]);

  return null;
}
