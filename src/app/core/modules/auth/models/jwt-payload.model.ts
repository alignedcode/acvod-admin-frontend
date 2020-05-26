export interface JwtPayload {
  id: string;
  accountDetails: {
    email: string;
    firstName: string;
    lastName: string;
  };
  providers: {
    youtube: { [key: string]: { accessToken: string } };
  };
}
