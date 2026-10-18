/**
 * Replace these placeholders with the official TRC Race payment details.
 * Do not publish until the values have been checked and approved.
 */
export const PAYMENT_DETAILS = {
  mpesa: {
    provider: "M-Pesa",
    recipient: "[Add registered recipient name]",
    number: "[Add official M-Pesa number]",
    tillOrReference: "[Add till / reference if applicable]",
    steps: [
      "Open M-Pesa on your phone.",
      "Choose the appropriate send-money or merchant-payment option.",
      "Enter the official recipient details shown above.",
      "Enter the exact fee for your selected race category.",
      "Confirm the recipient and amount before approving the payment.",
      "Keep the transaction confirmation message for your records.",
    ],
  },
  bankTransfer: {
    bankName: "[Add bank name]",
    accountName: "[Add account holder name]",
    accountNumber: "[Add account number]",
    branch: "[Add branch if required]",
    reference: "Use your full name or registration reference",
    steps: [
      "Open your banking app or visit your bank.",
      "Add the official account shown above as the beneficiary.",
      "Use your full name or registration reference as the payment reference.",
      "Transfer the exact race entry fee.",
      "Keep your bank confirmation or proof of payment.",
    ],
  },
  eWallet: {
    provider: "[Add supported E-Wallet provider]",
    recipient: "[Add wallet recipient name]",
    number: "[Add official wallet number]",
    steps: [
      "Open the supported E-Wallet service.",
      "Choose the send or transfer option.",
      "Enter the official wallet details shown above.",
      "Enter the exact race entry fee and confirm the recipient.",
      "Keep the transaction reference or confirmation message.",
    ],
  },
  instantMoney: {
    provider: "[Add Instant Money provider]",
    recipient: "[Add official recipient name]",
    number: "[Add official recipient number]",
    steps: [
      "Open the supported Instant Money service or visit an authorised agent.",
      "Follow the provider's process to send the entry fee.",
      "Use the official recipient details shown above.",
      "Keep the transaction reference and any collection or confirmation details.",
      "Never share your PIN or one-time password with anyone.",
    ],
  },
  cash: {
    locations: [
      "[Add approved cash payment location]",
      "[Add contact person and operating hours]",
    ],
    steps: [
      "Visit an approved TRC Race cash payment point.",
      "Tell the organiser your chosen race distance.",
      "Pay the exact entry fee and request an official receipt.",
      "Keep the receipt until your registration is confirmed.",
    ],
  },
} as const;
