'use server';

import prisma from '@/lib/db';
import { randomBytes } from 'crypto';
import { sendRaceTicketEmail } from '@/lib/ticket-email';
import { requireOrganizer } from '@/lib/organizer-auth';

function getRaceCategoryCode(raceCategory: string): string | null {
  const normalized = raceCategory.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');

  const categoryCodes: Record<string, string> = {
    '2.5km': 'TRC-25',
    '2.5k': 'TRC-25',
    '25km': 'TRC-25',
    '5km': 'TRC-05',
    '5k': 'TRC-05',
    '10km': 'TRC-10',
    '10k': 'TRC-10',
    '21km': 'TRC-21',
    '21k': 'TRC-21',
  };

  return categoryCodes[normalized] ?? null;
}

export async function approveRunnerRegistration(registrationId: string) {
  try {
    await requireOrganizer();

    if (typeof registrationId !== 'string' || !registrationId.trim()) {
      return {
        success: false,
        error: 'A valid registration ID is required.',
      };
    }

    const id = registrationId.trim();

    const runner = await prisma.runnerRegistration.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        raceCategory: true,
        paymentStatus: true,
        registrationStatus: true,
        raceNumber: true,
        ticketId: true,
      },
    });

    if (!runner) {
      return {
        success: false,
        error: 'Registration not found.',
      };
    }

    if (runner.paymentStatus !== 'VERIFIED') {
      return {
        success: false,
        error: 'This runner cannot be approved until their payment is verified.',
      };
    }

    if (runner.registrationStatus !== 'PENDING_APPROVAL') {
      return {
        success: false,
        error: `This registration cannot be approved. Current status: ${runner.registrationStatus}.`,
      };
    }

    if (runner.raceNumber) {
      return {
        success: false,
        error: `A race number has already been assigned: ${runner.raceNumber}`,
      };
    }

    const categoryCode = getRaceCategoryCode(runner.raceCategory);

    if (!categoryCode) {
      return {
        success: false,
        error: `Unrecognized race category: ${runner.raceCategory}. Please check the category value in your database.`,
      };
    }

    // Atomically allocate the next number for this category.
    const counter = await prisma.raceNumberCounter.upsert({
      where: {
        raceCategory: categoryCode,
      },
      update: {
        lastNumber: {
          increment: 1,
        },
      },
      create: {
        raceCategory: categoryCode,
        lastNumber: 1,
      },
      select: {
        lastNumber: true,
      },
    });

    const raceNumber = `${categoryCode}-${String(counter.lastNumber).padStart(3, '0')}`;

    // Generate a unique ticket ID for this approval attempt.
    const ticketId = randomBytes(32).toString('hex');

    // Approve only if payment and registration status remain valid.
    // Also handle null or missing raceNumber values in MongoDB.
    const updated = await prisma.runnerRegistration.updateMany({
      where: {
        id,
        paymentStatus: 'VERIFIED',
        registrationStatus: 'PENDING_APPROVAL',
        OR: [{ raceNumber: null }, { raceNumber: { isSet: false } }],
      },
      data: {
        registrationStatus: 'APPROVED',
        raceNumber,
        ticketId,
      },
    });

    if (updated.count !== 1) {
      console.error('Registration approval update matched zero records:', { id, raceNumber });

      return {
        success: false,
        error:
          'The registration could not be approved because its status changed. Refresh the page and try again.',
      };
    }

    // Approval and ticket creation have succeeded.
    // Email delivery is deliberately handled separately so an SMTP
    // failure cannot undo the approval or race-number assignment.
    try {
      await sendRaceTicketEmail({
        fullName: runner.fullName,
        email: runner.email,
        raceNumber,
        raceCategory: runner.raceCategory,
        ticketId,
      });

      await prisma.runnerRegistration.update({
        where: { id },
        data: {
          ticketEmailedAt: new Date(),
        },
      });

      return {
        success: true,
        raceNumber,
        emailSent: true,
        message: 'Registration approved, race number assigned, and ticket emailed successfully.',
      };
    } catch (emailError) {
      console.error('Ticket email delivery failed:', { registrationId: id, emailError });

      return {
        success: true,
        raceNumber,
        emailSent: false,
        message:
          'Registration approved and ticket generated, but the email could not be sent. Please resend the ticket email.',
      };
    }
  } catch (error) {
    console.error('RUNNER APPROVAL ERROR:', error);

    return {
      success: false,
      error: 'Unable to approve this registration. Please try again.',
    };
  }
}
