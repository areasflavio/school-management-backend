declare namespace Express {
  interface Request {
    id: string;
    accessToken?: string;
    base64File?: string;
  }
}
