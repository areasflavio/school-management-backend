import { describe, expect, test } from 'vitest';
import { SignUpController } from './sign-up';

describe('SignUp Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: email'));
  });
});
