import { Component } from '@angular/core';

@Component({
  selector: 'nebular-select',
  templateUrl: 'nebular-select.component.html',
  styleUrls: ['nebular-select.component.scss'],
})
export class NebularSelectComponent {
  commonSelectedItem = '2';
  selectedItem;
}
