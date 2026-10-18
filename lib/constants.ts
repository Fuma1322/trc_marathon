
export const RACE_CATEGORIES = [
  {
    id: "2.5km",
    name: "2.5 km Fun Run",
    distance: "2.5 km",
    fee: 90,
    description: "A relaxed run for beginners and casual runners.",
  },
  {
    id: "5km",
    name: "5 km Run",
    distance: "5 km",
    fee: 140,
    description: "A great challenge for recreational runners.",
  },
  {
    id: "10km",
    name: "10 km Run",
    distance: "10 km",
    fee: 220,
    description: "For runners looking for a longer challenge.",
  },
  {
    id: "21km",
    name: "21 km Half Marathon",
    distance: "21 km",
    fee: 280,
    description: "Take on the half-marathon distance.",
  },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    description: "Pay using M-Pesa mobile money.",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Transfer the registration fee to our bank account.",
  },
  {
    id: "e-wallet",
    name: "E-Wallet",
    description: "Pay using the supported e-wallet service.",
  },
  {
    id: "instant-money",
    name: "Instant Money",
    description: "Send money using an Instant Money service.",
  },
  {
    id: "cash",
    name: "Cash",
    description: "Pay at an approved registration point.",
  },
] as const;

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
} as const;

export const BRAND = {
  name: "Maseru Marathon",
  primary: "#25D366",
  dark: "#111111",
  white: "#FFFFFF",
} as const;
