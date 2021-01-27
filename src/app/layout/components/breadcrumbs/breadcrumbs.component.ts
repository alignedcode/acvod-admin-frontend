import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MenuItem } from '@layout/models/menu-item';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() model: MenuItem[];

  @Input() home: MenuItem;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter();

  itemClick(event, item: MenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item,
      });
    }

    this.onItemClick.emit({
      originalEvent: event,
      item,
    });
  }

  onHomeClick(event) {
    if (this.home) {
      this.itemClick(event, this.home);
    }
  }
}
