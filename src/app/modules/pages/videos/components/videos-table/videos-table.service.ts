import { Injectable } from '@angular/core';

@Injectable()
export class VideosTableService {
  readonly columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Source',
      valueGetter: 'data.source.provider',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Storage Status',
      field: 'storageState',
      sortable: true,
      filter: true,
    },
  ];
}
