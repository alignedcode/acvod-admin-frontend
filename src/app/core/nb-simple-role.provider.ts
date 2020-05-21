import { NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';
export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    return observableOf('guest');
  }
}
