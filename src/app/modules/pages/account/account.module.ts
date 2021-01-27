import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountLoginComponent } from './pages/account-login/account-login.component';
import { AccountLoginPageService } from './services/account-login-page.service';

@NgModule({
  imports: [SharedModule, AuthModule, AccountRoutingModule],
  providers: [AccountLoginPageService],
  declarations: [AccountLoginComponent, AccountDetailsComponent],
})
export class AccountModule {}
