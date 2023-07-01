declare namespace Express {
  interface Request {
    id: string;
    accessToken?: string;
  }
}
