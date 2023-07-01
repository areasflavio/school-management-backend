export type AuthenticateData = {
  email: string;
  password: string;
};

export interface Authenticate {
  execute: (data: AuthenticateData) => Promise<string>;
}
