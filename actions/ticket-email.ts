'use server';

import { randomUUID } from 'crypto';
import prisma from '@/lib/db';
import { requireOrganizer } from '@/lib/organizer-auth';
import { sendRaceTicketEmail } from '@/lib/ticket-email';

export async function resendRaceTicketEmail(registrationId: string) {
  try {
    console.log('[Resend Ticket] Action started');

    // 1. Verify organizer authentication
    await requireOrganizer();
    console.log('[Resend Ticket] Organizer authenticated');

    // 2. Validate registration ID
    if (typeof registrationId !== 'string' || !registrationId.trim()) {
      console.warn('[Resend Ticket] Invalid registration ID');

      return {
        success: false,
        error: 'A valid registration ID is required.',
      };
    }

    console.log('[Resend Ticket] Registration ID validated');

    // 3. Find the runner
    const runner = await prisma.runnerRegistration.findUnique({
      where: { id: registrationId.trim() },
      select: {
        id: true,
        fullName: true,
        email: true,
        raceCategory: true,
        raceNumber: true,
        ticketId: true,
        paymentStatus: true,
        registrationStatus: true,
      },
    });

    if (!runner) {
      console.warn('[Resend Ticket] Registration not found');

      return {
        success: false,
        error: 'Registration not found.',
      };
    }

    console.log('[Resend Ticket] Registration found');

    // 4. Verify payment, approval, and race number
    if (
      runner.paymentStatus !== 'VERIFIED' ||
      runner.registrationStatus !== 'APPROVED' ||
      !runner.raceNumber
    ) {
      console.warn('[Resend Ticket] Ticket eligibility check failed', {
        paymentVerified: runner.paymentStatus === 'VERIFIED',
        registrationApproved: runner.registrationStatus === 'APPROVED',
        hasRaceNumber: Boolean(runner.raceNumber),
      });

      return {
        success: false,
        error: 'This racer does not have a valid approved ticket to resend.',
      };
    }

    console.log('[Resend Ticket] Ticket eligibility confirmed');

    // 5. Generate and save a ticket ID if it is missing
    let ticketId = runner.ticketId;

    if (!ticketId) {
      console.log('[Resend Ticket] Ticket ID is missing. Generating a new ID.');

      ticketId = randomUUID();

      await prisma.runnerRegistration.update({
        where: { id: runner.id },
        data: { ticketId },
      });

      console.log('[Resend Ticket] Ticket ID saved successfully');
    } else {
      console.log('[Resend Ticket] Existing ticket ID found');
    }

    // 6. Send the ticket email
    console.log('[Resend Ticket] Attempting to send email');

    await sendRaceTicketEmail({
      fullName: runner.fullName,
      email: runner.email,
      raceNumber: runner.raceNumber,
      raceCategory: runner.raceCategory,
      ticketId,
    });

    console.log('[Resend Ticket] Email sent successfully');

    // 7. Record the successful email send operation
    await prisma.runnerRegistration.update({
      where: { id: runner.id },
      data: { ticketEmailedAt: new Date() },
    });

    console.log('[Resend Ticket] Email timestamp updated');

    return {
      success: true,
      message: `Ticket email sent to ${runner.email}.`,
    };
  } catch (error) {
    console.error('[Resend Ticket] Action failed:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    console.error('[Resend Ticket] Error details:', message);

    return {
      success: false,
      error:
        'Unable to resend the ticket email. Please check the email configuration and try again.',
    };
  }
}
