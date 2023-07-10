import { describe, expect, test, vi } from 'vitest';

import { MulterUploadFileAdapter } from './multer-uploadFile';

const makeSut = (): MulterUploadFileAdapter => {
  return new MulterUploadFileAdapter();
};

describe('Multer Adapter', () => {
  test('should call multer single with correct values', async () => {
    const sut = makeSut();
    const multerSpy = vi.spyOn(sut, 'single');
    sut.single('fieldName');
    expect(multerSpy).toBeCalledWith('fieldName');
  });
});
