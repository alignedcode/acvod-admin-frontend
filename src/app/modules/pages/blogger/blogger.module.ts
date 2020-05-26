import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { BloggerRoutingModule } from './blogger-routing.module';
import { BloggerLoginComponent } from './pages/blogger-login/blogger-login.component';

@NgModule({
  imports: [SharedModule, AuthModule, BloggerRoutingModule],
  declarations: [BloggerLoginComponent],
})
export class BloggerModule {}
