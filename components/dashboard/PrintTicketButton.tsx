'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, LoaderCircle } from 'lucide-react';

type Props = {
  ticketId: string;
};

export default function PrintTicketButton({ ticketId }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const ticket = document.querySelector('.ticket-print') as HTMLElement | null;

    if (!ticket) {
      toast.error('Unable to find the ticket. Please refresh and try again.');
      return;
    }

    setIsDownloading(true);

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      await html2pdf()
        .set({
          margin: [8, 8, 8, 8],
          filename: `TRC-Race-Ticket-${ticketId}.pdf`,
          image: {
            type: 'jpeg',
            quality: 0.98,
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
        })
        .from(ticket)
        .save();

      toast.success('Your ticket has been downloaded!');
    } catch (error) {
      console.error('Ticket download failed:', error);
      toast.error('Could not download your ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-[#111111] transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDownloading ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        <Download className="h-5 w-5" />
      )}

      {isDownloading ? 'Preparing PDF...' : 'Download Ticket'}
    </button>
  );
}
