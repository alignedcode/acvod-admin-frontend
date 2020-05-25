import { NgModule } from '@angular/core';

import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [LayoutModule, SharedModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
})
export class ComponentsModule {}
