'use server';

import prisma from '@/lib/db';
import { requireOrganizer } from '@/lib/organizer-auth';
import { revalidatePath } from 'next/cache';

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function verifyPayment(registrationId: string): Promise<ActionResult> {
  try {
    await requireOrganizer();

    if (!registrationId?.trim()) {
      return { success: false, error: 'Invalid registration ID.' };
    }

    const result = await prisma.runnerRegistration.updateMany({
      where: {
        id: registrationId,
        paymentStatus: 'PENDING',
        paymentMethod: { not: null },
      },
      data: { paymentStatus: 'VERIFIED' },
    });

    if (result.count !== 1) {
      return {
        success: false,
        error: 'Registration is missing payment details or is no longer pending.',
      };
    }

    revalidatePath('/dashboard/registrations');
    return { success: true };
  } catch {
    return { success: false, error: 'Unable to verify payment.' };
  }
}

export async function rejectPayment(registrationId: string): Promise<ActionResult> {
  try {
    await requireOrganizer();

    if (!registrationId?.trim()) {
      return { success: false, error: 'Invalid registration ID.' };
    }

    const result = await prisma.runnerRegistration.updateMany({
      where: {
        id: registrationId,
        paymentStatus: 'PENDING',
      },
      data: {
        paymentStatus: 'REJECTED',
        registrationStatus: 'REJECTED',
      },
    });

    if (result.count !== 1) {
      return {
        success: false,
        error: 'Payment is not pending or has already been processed.',
      };
    }

    revalidatePath('/dashboard/registrations');
    return { success: true };
  } catch {
    return { success: false, error: 'Unable to reject payment.' };
  }
}

export async function approveRegistration(registrationId: string): Promise<ActionResult> {
  try {
    await requireOrganizer();

    if (!registrationId?.trim()) {
      return { success: false, error: 'Invalid registration ID.' };
    }

    // Never approve a registration before payment is verified.
    const registration = await prisma.runnerRegistration.findUnique({
      where: { id: registrationId },
      select: {
        id: true,
        paymentStatus: true,
        registrationStatus: true,
        raceNumber: true,
      },
    });

    if (!registration) {
      return { success: false, error: 'Registration not found.' };
    }

    if (
      registration.paymentStatus !== 'VERIFIED' ||
      registration.registrationStatus !== 'PENDING_APPROVAL' ||
      registration.raceNumber
    ) {
      return {
        success: false,
        error: 'Only verified, pending registrations can be approved.',
      };
    }

    // Race-number allocation must use an atomic, unique allocation
    // strategy before this action is ready for production.
    return {
      success: false,
      error: 'Race-number allocation must be configured before approval is enabled.',
    };
  } catch {
    return { success: false, error: 'Unable to approve registration.' };
  }
}
