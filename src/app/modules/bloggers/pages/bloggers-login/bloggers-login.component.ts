import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'bloggers-login',
  styleUrls: ['./bloggers-login.component.scss'],
  templateUrl: './bloggers-login.component.html',
})
export class BloggersLoginComponent extends NbLoginComponent {}
