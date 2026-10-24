import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST() {
  // This endpoint is strictly for local development.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, TEST_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !TEST_EMAIL) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing SMTP or TEST_EMAIL environment variables.',
      },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();

    const result = await transporter.sendMail({
      from: SMTP_FROM,
      to: TEST_EMAIL,
      subject: 'TRC × LSRC Race 2026 — Email Test',
      text: [
        'Your TRC Race 2026 email configuration is working.',
        '',
        'This is a test message from your local Next.js application.',
        'No race registration has been approved by sending this email.',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#111">
          <div style="background:#111;padding:24px;border-radius:12px;color:white">
            <p style="color:#25D366;font-weight:bold">TRC × LSRC RACE 2026</p>
            <h1>Email setup successful</h1>
          </div>
          <p>Your local Next.js application has successfully sent a test email through Resend SMTP.</p>
          <p style="font-weight:bold">One Heat. One Run. One Lesotho.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Test email accepted by the SMTP provider.',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('SMTP TEST ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Email test failed.',
      },
      { status: 500 }
    );
  }
}
