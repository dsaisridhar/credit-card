import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @Input() public appNumbersOnly: boolean;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    if (this.appNumbersOnly) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }
}
