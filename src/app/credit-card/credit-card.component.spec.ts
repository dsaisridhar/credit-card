import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Common Components
import { CustomInputComponent } from './components/custom-input/custom-input.component';

// Common Directives
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { MaskDirective } from './directives/mask.directive';

import { CreditCardComponent } from './credit-card.component';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreditCardComponent,
        NumbersOnlyDirective,
        MaskDirective,
        CustomInputComponent,
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test setCreditCardValidations', () => {
    it('when the card is visa', () => {
      component.setCreditCardValidations('422222');
      expect(component.cardType).toEqual('visa');
      expect(component.cvvMaxLength).toEqual(3);
      expect(component.ccFormat).toEqual('0000-0000-0000-0000');
    });

    it('when the card is amex', () => {
      component.setCreditCardValidations('342222');
      expect(component.cardType).toEqual('amex');
      expect(component.cvvMaxLength).toEqual(4);
      expect(component.ccFormat).toEqual('0000-000000-00000');
    });

    it('when the card is invalid', () => {
      component.setCreditCardValidations('000000000000');
      expect(component.creditCardForm.get('cardNumber').hasError('invalid')).toBeTruthy();
    });
  });

  describe('should test validateDate', () => {
    it('when the date is valid', () => {
      component.creditCardForm.get('expMonth').patchValue('12');
      component.creditCardForm.get('expYear').patchValue('2025');

      component.validateDate();
      expect(component.creditCardForm.get('expMonth').hasError('invalid')).toBeFalsy();
    });

    it('when the date is invalid', () => {
      component.creditCardForm.get('expMonth').patchValue('04');
      component.creditCardForm.get('expYear').patchValue('2021');

      component.validateDate();
      expect(component.creditCardForm.get('expMonth').hasError('invalid')).toBeTruthy();
    });
  });

  it('should test invalid card on blur', () => {
    component.creditCardForm.get('cardNumber').patchValue('411111111');
    component.cardType = 'visa';

    component.onCardNumberBlur();
    expect(component.creditCardForm.get('cardNumber').hasError('invalid')).toBeTruthy();
  });
});
