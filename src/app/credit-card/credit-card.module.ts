import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Common Components
import { CustomInputComponent } from './components/custom-input/custom-input.component';

// Common Directives
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { MaskDirective } from './directives/mask.directive';

import { CreditCardComponent } from './credit-card.component';

const DIRECTIVES = [
  NumbersOnlyDirective,
  MaskDirective,
];

const COMMON_COMPONENTS = [
  CustomInputComponent,
];

@NgModule({
  declarations: [
    CreditCardComponent,
    ...DIRECTIVES,
    ...COMMON_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreditCardComponent,
    ...DIRECTIVES,
    ...COMMON_COMPONENTS,
  ]
})
export class CreditCardModule { }
