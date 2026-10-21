import { z } from 'zod';

export const RegistrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(254),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(25),
  gender: z.enum(['female', 'male', 'other', 'prefer_not_to_say']),
  raceCategory: z.enum(['2.5km', '5km', '10km', '21km']),
  acceptedTerms: z.literal(true, {
    message: 'You must confirm your registration details',
  }),
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;
