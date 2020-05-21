import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';

import { LayoutModule } from '../../layout/layout.module';
import { AccordionComponent } from './accordion/accordion.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import {
  Tab1Component,
  Tab2Component,
  TabsComponent,
} from './tabs/tabs.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    LayoutRoutingModule,
  ],
  declarations: [
    LayoutComponent,
    TabsComponent,
    Tab1Component,
    Tab2Component,
    StepperComponent,
    ListComponent,
    AccordionComponent,
  ],
})
export class LayoutPageModule {}
