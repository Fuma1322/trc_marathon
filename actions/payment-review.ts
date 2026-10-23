'use server';

import prisma from '@/lib/db';
import { requireOrganizer } from '@/lib/organizer-auth';

type ReviewDecision = 'VERIFIED' | 'REJECTED';

export async function reviewRegistrationPayment(registrationId: string, decision: ReviewDecision) {
  // Protect this action even if it is called outside the dashboard UI.
  await requireOrganizer();

  if (typeof registrationId !== 'string' || !registrationId.trim()) {
    return {
      success: false,
      error: 'A valid registration ID is required.',
    };
  }

  if (decision !== 'VERIFIED' && decision !== 'REJECTED') {
    return {
      success: false,
      error: 'Invalid payment decision.',
    };
  }

  try {
    // Only a payment that is still pending can be reviewed.
    const result = await prisma.runnerRegistration.updateMany({
      where: {
        id: registrationId.trim(),
        paymentStatus: 'PENDING',
        registrationStatus: 'PENDING_APPROVAL',
      },
      data: {
        paymentStatus: decision,
      },
    });

    if (result.count !== 1) {
      const current = await prisma.runnerRegistration.findUnique({
        where: { id: registrationId.trim() },
        select: {
          id: true,
          paymentStatus: true,
          paymentMethod: true,
        },
      });

      if (!current) {
        return {
          success: false,
          error: 'Registration not found.',
        };
      }

      if (!current.paymentMethod) {
        return {
          success: false,
          error: 'No payment method has been submitted for this registration.',
        };
      }

      return {
        success: false,
        error: `This payment can no longer be reviewed. Current status: ${current.paymentStatus}.`,
      };
    }

    return {
      success: true,
      status: decision,
    };
  } catch (error) {
    console.error('PAYMENT REVIEW ERROR:', error);

    return {
      success: false,
      error: 'Unable to update this payment. Please try again.',
    };
  }
}
