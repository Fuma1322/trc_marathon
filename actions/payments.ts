'use server';

import prisma from '@/lib/db';

type PaymentMethod = 'mpesa' | 'bank-transfer' | 'cash';

type SubmitPaymentInput = {
  registrationId: string;
  method: PaymentMethod;
  reference?: string;
};

export async function submitRegistrationPayment(input: SubmitPaymentInput) {
  try {
    const registrationId = input.registrationId?.trim();
    const reference = input.reference?.trim() ?? '';

    const allowedMethods: PaymentMethod[] = ['mpesa', 'bank-transfer', 'cash'];

    if (!registrationId || !allowedMethods.includes(input.method)) {
      return {
        data: null,
        status: 400,
        error: 'Invalid registration or payment method.',
      };
    }

    if (input.method !== 'cash' && !reference) {
      return {
        data: null,
        status: 400,
        error: 'Please enter your transaction reference.',
      };
    }

    const registration = await prisma.runnerRegistration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      return {
        data: null,
        status: 404,
        error: 'Registration not found.',
      };
    }

    if (registration.paymentMethod) {
      return {
        data: null,
        status: 409,
        error: 'Payment details have already been submitted.',
      };
    }

    const updated = await prisma.runnerRegistration.update({
      where: { id: registrationId },
      data: {
        paymentMethod: input.method,
        paymentReference: input.method === 'cash' ? null : reference,
        paymentStatus: 'PENDING',
        registrationStatus: 'PENDING_APPROVAL',
      },
    });

    return {
      data: {
        id: updated.id,
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
        raceCategory: updated.raceCategory,
        entryFee: updated.entryFee,
        paymentMethod: updated.paymentMethod,
        paymentReference: updated.paymentReference,
        paymentStatus: updated.paymentStatus,
        registrationStatus: updated.registrationStatus,
        raceNumber: updated.raceNumber,
      },
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error('SUBMIT PAYMENT ERROR:', error);

    return {
      data: null,
      status: 500,
      error: 'We could not submit your payment details. Please try again.',
    };
  }
}
