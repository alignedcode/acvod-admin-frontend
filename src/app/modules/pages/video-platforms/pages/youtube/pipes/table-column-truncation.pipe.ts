import { Pipe, PipeTransform } from '@angular/core';
import { ShortenPipe } from 'ngx-pipes';

@Pipe({
  name: 'tableColumnTruncation',
})
export class TableColumnTruncationPipe implements PipeTransform {
  constructor(private readonly truncationPipe: ShortenPipe) {}

  transform(columnValue: string): string {
    return this.truncationPipe.transform(columnValue, 220, '...', true);
  }
}
