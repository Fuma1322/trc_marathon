import nodemailer from 'nodemailer';

type RaceTicketEmailData = {
  fullName: string;
  email: string;
  raceNumber: string;
  raceCategory: string;
  ticketId: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is incomplete.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

export async function sendRaceTicketEmail(ticket: RaceTicketEmailData) {
  const appUrl = process.env.APP_URL;
  const from = process.env.SMTP_FROM;

  if (!appUrl || !from) {
    throw new Error('APP_URL or SMTP_FROM is missing.');
  }

  const ticketUrl = new URL(`/ticket/${encodeURIComponent(ticket.ticketId)}`, appUrl).toString();

  const transporter = getTransporter();

  await transporter.sendMail({
    from,
    to: ticket.email,
    subject: 'Your Official TRC Race 2026 Ticket',
    text: [
      `Hello ${ticket.fullName},`,
      '',
      'Your registration for the TRC × LSRC Race 2026 has been approved.',
      `Race number: ${ticket.raceNumber}`,
      `Race category: ${ticket.raceCategory}`,
      '',
      `View and print your ticket: ${ticketUrl}`,
      '',
      'Event date: 14 November 2026',
      'Venue: TRC Compound, Maseru, Lesotho',
      '',
      'One Heat. One Run. One Lesotho.',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111111;line-height:1.6">
        <div style="background:#111111;color:white;padding:26px;border-radius:14px 14px 0 0">
          <p style="color:#25D366;font-size:12px;font-weight:bold;letter-spacing:2px">
            OFFICIAL RACE PASS
          </p>
          <h1 style="margin:0">TRC × LSRC Race 2026</h1>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 14px 14px">
          <p>Hello ${escapeHtml(ticket.fullName)},</p>
          <p>Your registration has been approved. Your official race ticket is ready.</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:18px;border-radius:12px">
            <p style="margin:0;color:#166534;font-size:12px;font-weight:bold">YOUR RACE NUMBER</p>
            <h2 style="margin:4px 0;color:#111111;font-size:32px">${escapeHtml(ticket.raceNumber)}</h2>
            <p style="margin:0">${escapeHtml(ticket.raceCategory)}</p>
          </div>
          <p><strong>Event:</strong> 14 November 2026</p>
          <p><strong>Venue:</strong> TRC Compound, Maseru, Lesotho</p>
          <p style="margin:28px 0">
            <a href="${ticketUrl}" style="background:#25D366;color:#111111;padding:13px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
              View My Race Ticket
            </a>
          </p>
          <p>Save or print your ticket and keep your race number for event day.</p>
          <p style="font-weight:bold">One Heat. One Run. One Lesotho.</p>
        </div>
      </div>
    `,
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}
