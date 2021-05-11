import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const resolvedPromise: Promise<null> = Promise.resolve(null);

@Directive({
  selector: '[mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDirective),
      multi: true
    }
  ]
})
export class MaskDirective implements OnInit, ControlValueAccessor {
  private _maskExpression: string;
  private _maskSpecialCharacters: string[] = ['/', '(', ')', '.', ':', '-', ' ', '+'];
  private _maskAwaliablePatterns: { [key: string]: RegExp } = {
    0: /\d/,
    9: /\d/,
    A: /[a-zA-Z0-9]/,
    S: /[a-zA-Z]/
  };

  public constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {}

  public ngOnInit(): void {
    resolvedPromise.then(() => this._applyValueChanges());
  }

  @Input('mask')
  public set maskExpression(value: string) {
    if (!value) {
      return;
    }
    this._maskExpression = value;
  }

  @HostListener('input')
  public onInput(): void {
    this._applyValueChanges();
  }

  @HostListener('blur')
  public onBlur(): void {
    this._applyValueChanges();
  }

  public writeValue(inputValue: string): void {
    if (!inputValue) {
      return;
    }
    this._elementRef.nativeElement.value = this._applyMask(inputValue, this._maskExpression);
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
    return;
  }

  public registerOnTouched(fn: any): void { }

  private _onChange = (_: any) => { };

  private _applyMask(inputValue: string, maskExpression: string): string {
    let cursor = 0;
    let result = '';
    const inputArray: string[] = inputValue.split('');

    for (let i = 0, inputSymbol: string = inputArray[0]; i
    < inputArray.length; i++ , inputSymbol = inputArray[i]) {
      if (result.length === maskExpression.length) {
        break;
      }

      if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
        result += inputSymbol;
        cursor++;
      } else if (this._maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
        result += maskExpression[cursor];
        cursor++;
        i--;
      } else if (maskExpression[cursor] === '9') {
        cursor++;
        i--;
      }
    }
    if (result.length + 1 === maskExpression.length
      && this._maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
      result += maskExpression[maskExpression.length - 1];
    }
    return result;
  }

  private _removeMask(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/(\/|\.|-|\(|\)|:| |\+)/gi, '');
  }

  private _checkSymbolMask(inputSymbol: string, maskSymbol: string): boolean {
    return inputSymbol === maskSymbol
      || this._maskAwaliablePatterns[maskSymbol]
      && this._maskAwaliablePatterns[maskSymbol].test(inputSymbol);
  }

  private _applyValueChanges(): void {
    const val: string = this._elementRef.nativeElement.value;
    const maskedInput: string = this._applyMask(val, this._maskExpression);

    this._elementRef.nativeElement.value = maskedInput;
    this._onChange(this._removeMask(maskedInput));
  }
}
