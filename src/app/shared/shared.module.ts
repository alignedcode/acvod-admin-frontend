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
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
  imports: [
    CommonModule,
    ...NB_MODULES,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    ...PIPES,
    ...NB_MODULES,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [...PIPES],
})
export class SharedModule {}
