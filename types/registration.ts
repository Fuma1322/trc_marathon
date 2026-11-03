import { z } from 'zod';

export const VEST_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'] as const;

export const RegistrationSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Please enter your full name').max(100),

    email: z.string().trim().email('Please enter a valid email address').max(254),

    phone: z.string().trim().min(7, 'Please enter a valid phone number').max(25),

    gender: z.enum(['female', 'male', 'other', 'prefer_not_to_say']),

    raceCategory: z.enum(['2.5km', '5km', '10km', '21km']),

    // An empty string is allowed in the form when a vest is not applicable.
    vestSize: z.enum(VEST_SIZES).or(z.literal('')),

    acceptedTerms: z.literal(true, {
      message: 'You must confirm your registration details',
    }),
  })
  .superRefine((data, ctx) => {
    const vestEligible = data.raceCategory === '10km' || data.raceCategory === '21km';

    if (vestEligible && !data.vestSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['vestSize'],
        message: 'Please select your vest size',
      });
    }

    if (!vestEligible && data.vestSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['vestSize'],
        message: 'Vests are only available for the 10 km and 21 km races',
      });
    }
  });

export type RegistrationInput = z.infer<typeof RegistrationSchema>;
export type VestSize = (typeof VEST_SIZES)[number];
