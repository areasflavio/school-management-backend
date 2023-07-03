import { ServerError } from '@application/errors';
import { Tokenizer } from '@core/helpers/tokenizer';
import { describe, expect, test, vi } from 'vitest';
import { AuthMiddleware } from './auth';

const makeTokenizer = (): Tokenizer => {
  class TokenizerStub implements Tokenizer {
    sign(value: string): Promise<string> {
      return Promise.resolve('token');
    }
    verify(token: string): Promise<string | undefined> {
      return Promise.resolve('value');
    }
  }
  return new TokenizerStub();
};

interface SutTypes {
  sut: AuthMiddleware;
  tokenizerStub: Tokenizer;
}

const makeSut = (): SutTypes => {
  const tokenizerStub = makeTokenizer();
  const sut = new AuthMiddleware(tokenizerStub);
  return {
    sut,
    tokenizerStub,
  };
};

describe('AuthMiddleware', () => {
  test('should return 403 if no access token is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      accessToken: undefined,
    });
    expect(httpResponse.statusCode).toBe(403);
  });

  test('should return 403 if access token is invalid', async () => {
    const { sut, tokenizerStub } = makeSut();
    vi.spyOn(tokenizerStub, 'verify').mockReturnValueOnce(
      Promise.resolve(undefined)
    );
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(403);
  });

  test('should call Tokenizer with correct data', async () => {
    const { sut, tokenizerStub } = makeSut();
    const verifySpy = vi.spyOn(tokenizerStub, 'verify');
    await sut.handle({
      accessToken: 'token',
    });
    expect(verifySpy).toHaveBeenCalledWith('token');
  });

  test('should return 400 if an AuthMiddleware throws an Error instance', async () => {
    const { sut, tokenizerStub } = makeSut();
    vi.spyOn(tokenizerStub, 'verify').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if an AuthMiddleware throws', async () => {
    const { sut, tokenizerStub } = makeSut();
    vi.spyOn(tokenizerStub, 'verify').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 access token is valid', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(200);
  });
});
