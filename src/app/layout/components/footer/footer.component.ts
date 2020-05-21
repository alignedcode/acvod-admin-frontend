import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by
      <b><a href="https://alignedcode.com" target="_blank">Aligned Code</a></b>
    </span>
  `,
})
export class FooterComponent {}
