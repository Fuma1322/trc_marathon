export const BRAND = {
  name: 'TRC Race',
  primary: '#25D366',
  dark: '#111111',
  white: '#FFFFFF',
} as const;

export const RACE_CATEGORIES = [
  {
    id: '2.5km',
    name: '2.5 km',
    distance: '2.5 km',
    fee: 90,
    description: 'A relaxed distance for beginners and casual runners.',
    level: 'Fun Walk/Run',
  },
  {
    id: '5km',
    name: '5 km',
    distance: '5 km',
    fee: 140,
    description: 'A great challenge for recreational runners.',
    level: 'Fun Walk/Run',
  },
  {
    id: '10km',
    name: '10 km',
    distance: '10 km',
    fee: 220,
    description: 'For runners ready to push their pace and endurance.',
    level: 'Challenge Run',
  },
  {
    id: '21km',
    name: '21 km',
    distance: '21 km',
    fee: 280,
    description: 'Take on the half-marathon distance.',
    level: 'Half Marathon',
  },
] as const;

export type RaceCategoryId = (typeof RACE_CATEGORIES)[number]['id'];

export const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-Pesa', description: 'Pay using M-Pesa mobile money.' },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Transfer the entry fee to the event bank account.',
  },

  { id: 'cash', name: 'Cash', description: 'Pay at an approved registration point.' },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]['id'];

export const PAYMENT_STATUSES = {
  PENDING: 'Pending',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
} as const;
