export interface Tokenizer {
  sign: (value: string) => Promise<string>;
  verify: (token: string) => Promise<string | undefined>;
}
