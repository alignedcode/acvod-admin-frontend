import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistsTableService {
  readonly columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
    },
    { headerName: 'Privacy', field: 'privacy', sortable: true, filter: true },
  ];
}
