import { AbstractControl, ValidatorFn, Validators} from '@angular/forms';

export class CreditCardValidators extends Validators {

  static expiryMonth(): ValidatorFn {
    return(c: AbstractControl): {[key: string]: boolean} | null => {
      const month = c.value;
      if (month === undefined || month === '') {
        return null;
      }

      if (month.length === 2 && parseInt(month) <= 12) {
        return null;
      }

      return { invalid: true };
    };
  }

  static expiryYear(): ValidatorFn {
    return(c: AbstractControl): {[key: string]: boolean} | null => {
      const year = c.value;
      if (year === undefined || year === '') {
        return null;
      }

      const currentYear = new Date().getFullYear();

      if (year.length === 4 && parseInt(year) >= currentYear) {
        return null;
      }

      return { invalid: true };
    };
  }

  static isDateInvalid(month: string, year: string): boolean {
    if (!month || !year) {
      return false;
    }
    if (month.length === 2 && year.length === 4) {
      const monthInt = parseInt(month);
      if (monthInt > 12) {
        return true;
      }

      const expiry = new Date(+(year), monthInt);
      const current = new Date();

      return expiry.getTime() < current.getTime();
    }

    return true;
  }
}
