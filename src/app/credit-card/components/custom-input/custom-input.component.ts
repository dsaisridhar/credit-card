import { Component, Self, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements ControlValueAccessor {
  // tslint:disable-next-line
  @Input() id = 'default_id';
  @Input() inputLabel = '';
  @Input() numbersOnly = false;
  @Input() maxlength = 1000;

  @Output() blurEvent = new EventEmitter<any>();

  constructor(
    @Self() public ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any) {  }

  registerOnChange(fn: any) { }

  registerOnTouched(fn: any) { }

  setDisabledState?(isDisabled: boolean) { }

  onBlur($event: Event) {
    this.blurEvent.emit({ id: this.id });
  }
}
