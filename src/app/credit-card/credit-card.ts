import { Validators } from '@angular/forms';
import { CreditCardValidators } from './validators/credit-card-validators';

export type CardType = 'visa' | 'amex';

export const CC_VALIDATORS = {
  name: [Validators.required],
  cardNumber: [Validators.required],
  cvv: [Validators.required],
  expMonth: [
    Validators.required,
    CreditCardValidators.expiryMonth(),
  ],
  expYear: [
    Validators.required,
    CreditCardValidators.expiryYear(),
  ]
};

export const CC_DETAILS = {
  visa: {
    cardFormat: '0000-0000-0000-0000',
    minLength: 16,
  },
  amex: {
    cardFormat: '0000-000000-00000',
    minLength: 15,
  },
};
