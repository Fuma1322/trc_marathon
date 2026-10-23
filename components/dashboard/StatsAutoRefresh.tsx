'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StatsAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
    }, 5_000); // Refresh every 5 seconds

    return () => window.clearInterval(interval);
  }, [router]);

  return null;
}
