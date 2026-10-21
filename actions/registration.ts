'use server';

import prisma from '@/lib/db';
import { RegistrationSchema } from '@/types/registration';
import { RACE_CATEGORIES } from '@/lib/constants';
import { revalidatePath } from 'next/cache';

export async function createRegistration(input: unknown) {
  try {
    const parsed = RegistrationSchema.safeParse(input);

    if (!parsed.success) {
      return {
        data: null,
        status: 400,
        error: parsed.error.flatten(),
      };
    }

    const validData = parsed.data;

    // Always calculate the fee on the server.
    const selectedRace = RACE_CATEGORIES.find((race) => race.id === validData.raceCategory);

    if (!selectedRace) {
      return {
        data: null,
        status: 400,
        error: 'Invalid race category',
      };
    }

    const email = validData.email.toLowerCase();

    // Prevent duplicate registrations for the same race.
    const existingRegistration = await prisma.runnerRegistration.findFirst({
      where: {
        email,
        raceCategory: validData.raceCategory,
      },
    });

    if (existingRegistration) {
      return {
        data: null,
        status: 409,
        error: 'This email is already registered for this race category.',
      };
    }

    const registration = await prisma.runnerRegistration.create({
      data: {
        fullName: validData.fullName,
        email,
        phone: validData.phone,
        gender: validData.gender,
        raceCategory: validData.raceCategory,
        entryFee: selectedRace.fee,
        paymentStatus: 'PENDING',
      },
    });

    revalidatePath('/');

    return {
      data: {
        id: registration.id,
        fullName: registration.fullName,
        email: registration.email,
        raceCategory: registration.raceCategory,
        entryFee: registration.entryFee,
        paymentStatus: registration.paymentStatus,
      },
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error('CREATE REGISTRATION ERROR:', error);

    return {
      data: null,
      status: 500,
      error: 'Registration could not be completed. Please try again.',
    };
  }
}
