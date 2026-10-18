/**
 * Replace these placeholders with the official TRC Race payment details.
 * Do not publish until the values have been checked and approved.
 */
export const PAYMENT_DETAILS = {
  mpesa: {
    provider: 'M-Pesa',
    recipient: 'Transformation Resource Centre (TRC)',
    tillOrReference: '46513',
    steps: [
      'Open M-Pesa on your phone.',
      'Choose merchant-payment option.',
      'Enter the exact fee for your selected race category.',
      'Confirm the recipient and amount before approving the payment.',
      'Upload your M-Pesa confirmation message or screenshot to the registration form.',
      'Complete the registration and wait for verification.',
    ],
  },
  bankTransfer: {
    bankName: 'First National Bank (FNB)',
    accountName: 'Transformation Resource Centre (TRC)',
    accountNumber: '62106641972',
    branch: 'Pioneer Branch',
    reference: 'Use your full name',
    steps: [
      'Open your banking app or visit your bank.',
      'Add the official account shown above as the beneficiary.',
      'Use your full names as the payment reference.',
      'Transfer the exact race entry fee.',
      'Upload your bank confirmation or proof of payment below.',
      'Complete the registration and wait for verification.',
    ],
  },
  eWallet: {
    provider: 'FNB eWallet',
    recipient: 'Transformation Resource Centre (TRC)',
    number: '+266 59734593',
    steps: [
      'Open the supported E-Wallet service.',
      'Choose the send or transfer option.',
      'Enter the official wallet details shown above.',
      'Enter the exact race entry fee and confirm the recipient.',
      'Upload your E-Wallet confirmation or proof of payment below.',
      'Complete the registration and wait for verification.',
    ],
  },
  instantMoney: {
    provider: 'Standard Lesotho Bank Instant Money',
    recipient: 'Transformation Resource Centre (TRC)',
    number: '+266 59734593',
    steps: [
      'Open the supported Instant Money service or visit an authorised agent.',
      "Follow the provider's process to send the entry fee.",
      'Use the official recipient details shown above.',
      'Keep the transaction reference and any collection or confirmation details.',
      'Never share your PIN or one-time password with anyone.',
    ],
  },
  cash: {
    locations: [
      '1 Oak Tree Gardens, Qoaling Road, Old Europa',
      'Open from 8:00 AM to 5:00 PM, Monday to Friday',
    ],
    steps: [
      'Visit the TRC Offices in address above.',
      'Tell the organiser your chosen race distance.',
      'Pay the exact entry fee and request an official receipt.',
      'Keep the receipt until your registration is confirmed.',
    ],
  },
} as const;
