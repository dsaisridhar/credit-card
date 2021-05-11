import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CreditCardValidators } from './validators/credit-card-validators';
import { CardType, CC_DETAILS, CC_VALIDATORS } from './credit-card';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  creditCardForm: FormGroup;
  cvvMaxLength = 3;
  ccFormat = CC_DETAILS.visa.cardFormat;
  cardType: CardType;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildCreditCardForm();
  }

  ngOnInit(): void {
    this.creditCardForm.get('cardNumber').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(cardNumber => {
      this.setCreditCardValidations(cardNumber);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmitPayment() {
    if (this.creditCardForm.invalid) {
      this.creditCardForm.markAllAsTouched();
      return;
    }

    console.log(this.creditCardForm.value);
    // Call Backend
  }

  onCardNumberBlur() {
    if (!CC_DETAILS[this.cardType]) { return; }
    if (this.creditCardForm.value.cardNumber.length < CC_DETAILS[this.cardType].minLength) {
      this.creditCardForm.get('cardNumber').setErrors({invalid: true});
    }
  }

  validateDate() {
    const cardValue = this.creditCardForm.value;
    if (CreditCardValidators.isDateInvalid(cardValue.expMonth, cardValue.expYear)) {
      this.creditCardForm.get('expMonth').setErrors({invalid: true});
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.creditCardForm.controls[controlName].dirty && this.creditCardForm.controls[controlName].hasError(errorName);
  }

  private setCreditCardValidations(cardNumber) {
    if (cardNumber.charAt(0) === '4') {
      this.cardType = 'visa';
      this.addCVVValidation(3);
      this.ccFormat = CC_DETAILS.visa.cardFormat;
    } else if (cardNumber >= 2 && (cardNumber.substring(0, 2) === '34' || cardNumber.substring(0, 2) === '37')) {
      this.addCVVValidation(4);
      this.cardType = 'amex';
      this.ccFormat = CC_DETAILS.amex.cardFormat;
    } else {
      this.cardType = undefined;
      if (cardNumber) {
        this.creditCardForm.get('cardNumber').setErrors({invalid: true});
      }
    }
  }

  private addCVVValidation(minCVVLength) {
    this.cvvMaxLength = minCVVLength;
    this.creditCardForm.get('cvv').setValidators([
      Validators.required,
      Validators.minLength(minCVVLength),
    ]);
  }

  private buildCreditCardForm() {
    this.creditCardForm = this.fb.group({
      name: ['', CC_VALIDATORS.name],
      cardNumber: ['', CC_VALIDATORS.cardNumber],
      cvv: ['', CC_VALIDATORS.cvv],
      expMonth: ['', CC_VALIDATORS.expMonth],
      expYear: ['', CC_VALIDATORS.expYear],
    });
  }
}
