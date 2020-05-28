export interface PaginatedResponse<T> {
  items: T[];

  nextPageToken?: string | null;
  prevPageToken?: string | null;
}
