export interface JwtPayload {
  bloggerId: string;
  accountDetails: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
