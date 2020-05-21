import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CapitalizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
} from './pipes';

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, ...PIPES],
  declarations: [...PIPES],
})
export class SharedModule {}
