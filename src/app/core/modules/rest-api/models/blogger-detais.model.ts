export interface BloggerDetails {
  id: string;
  account: {
    email: string;
    firstName: string;
    lastName: string;
  };
  applicationKey: string;
}
