'use server';

import type { PaymentMethodId } from '@/lib/constants';
import prisma from '@/lib/db';

type PaymentMethod = 'mpesa' | 'bank-transfer' | 'cash';

type SubmitPaymentInput = {
  registrationId: string;
  method: PaymentMethodId;
  reference?: string;
};

const ALLOWED_METHODS: PaymentMethod[] = ['mpesa', 'bank-transfer', 'cash'];

export async function submitRegistrationPayment(input: SubmitPaymentInput) {
  try {
    // Validate and normalize the registration ID.
    const registrationId =
      typeof input?.registrationId === 'string' ? input.registrationId.trim() : '';

    if (!registrationId) {
      return {
        data: null,
        status: 400,
        error: 'Your registration reference is missing.',
      };
    }

    // Validate the payment method.
    const method = input?.method;

    if (typeof method !== 'string' || !ALLOWED_METHODS.includes(method as PaymentMethod)) {
      return {
        data: null,
        status: 400,
        error: 'Please select a valid payment method.',
      };
    }

    // Normalize the transaction reference.
    const reference = typeof input?.reference === 'string' ? input.reference.trim() : '';

    // M-Pesa and bank transfers require a transaction reference.
    // Cash payments do not require a reference.
    if (method !== 'cash' && !reference) {
      return {
        data: null,
        status: 400,
        error: 'Please enter your transaction reference.',
      };
    }

    // Prevent excessively long references.
    if (reference.length > 100) {
      return {
        data: null,
        status: 400,
        error: 'The payment reference must not exceed 100 characters.',
      };
    }

    // Find the registration.
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

    // Prevent payment details from being submitted more than once.
    if (registration.paymentMethod !== null || registration.paymentReference !== null) {
      return {
        data: null,
        status: 409,
        error: 'Payment details have already been submitted.',
      };
    }

    // Only registrations awaiting payment submission are eligible.
    if (
      registration.paymentStatus !== 'PENDING' ||
      registration.registrationStatus !== 'PENDING_APPROVAL'
    ) {
      return {
        data: null,
        status: 409,
        error: 'This registration is not eligible for payment submission.',
      };
    }

    // Save the payment details.
    const saved = await prisma.runnerRegistration.update({
      where: { id: registrationId },
      data: {
        paymentMethod: method,

        // Cash payments do not have a transaction reference.
        paymentReference: method === 'cash' ? null : reference,

        // Payment remains pending until an organiser verifies it.
        paymentStatus: 'PENDING',
        registrationStatus: 'PENDING_APPROVAL',
      },
    });

    // Return the updated registration.
    return {
      data: {
        id: saved.id,
        fullName: saved.fullName,
        email: saved.email,
        phone: saved.phone,
        raceCategory: saved.raceCategory,
        entryFee: saved.entryFee,
        paymentMethod: saved.paymentMethod,
        paymentReference: saved.paymentReference,
        paymentStatus: saved.paymentStatus,
        registrationStatus: saved.registrationStatus,
        raceNumber: saved.raceNumber,
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
