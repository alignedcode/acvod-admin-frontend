import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { BloggersRoutingModule } from './bloggers-routing.module';
import { BloggersLoginComponent } from './pages/bloggers-login/bloggers-login.component';

@NgModule({
  imports: [SharedModule, AuthModule, BloggersRoutingModule],
  declarations: [BloggersLoginComponent],
})
export class BloggersModule {}
