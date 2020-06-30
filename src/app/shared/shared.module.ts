import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  NbProgressBarModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgGridModule } from 'ag-grid-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';

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

const MATERIAL_MODULES = [MatCommonModule, MatButtonModule, MatToolbarModule];

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
  NbSpinnerModule,
  NbProgressBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...NB_MODULES,
    ...MATERIAL_MODULES,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgPipesModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    CommonModule,
    ...PIPES,
    ...NB_MODULES,
    ...MATERIAL_MODULES,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgPipesModule,
    AgGridModule,
  ],
  declarations: [...PIPES],
})
export class SharedModule {}
