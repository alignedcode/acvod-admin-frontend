import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { BloggersLoginComponent } from './pages/bloggers-login/bloggers-login.component';

@NgModule({ imports: [AuthModule], declarations: [BloggersLoginComponent] })
export class BloggersModule {}
