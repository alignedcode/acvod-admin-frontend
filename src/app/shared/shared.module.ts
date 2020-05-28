import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';

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

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbAlertModule,
  NbInputModule,
  NbCheckboxModule,
  NbUserModule,
  NbActionsModule,
  NbAccordionModule,
  NbTabsetModule,
  NbCardModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbRadioModule,
  NbDatepickerModule,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, FormsModule],
  exports: [CommonModule, ...PIPES, ...NB_MODULES, FormsModule],
  declarations: [...PIPES],
})
export class SharedModule {}
