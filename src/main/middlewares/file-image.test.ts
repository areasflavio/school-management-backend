import path from 'path';
import request from 'supertest';
import { describe, it } from 'vitest';

import { MulterUploadFileAdapter } from '@main/adapter/multer-uploadFile';
import app from '@main/config/app';
import { fileImage } from './file-image';

const filePath = path.resolve(__dirname, '..', '..', '__tests__');

const multer = new MulterUploadFileAdapter();

describe('File Image Middleware', () => {
  it('should return an error if req.file is not found', async () => {
    app.post(
      '/test_file_image',
      multer.single('file'),
      fileImage(),
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app).post('/test_file_image').expect(400);
  });

  it('should return an error if req.file is not an image', async () => {
    app.post(
      '/test_file_image',
      multer.single('file'),
      fileImage(),
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_file_image')
      .attach('file', `${filePath}/file.txt`)
      .expect(400);
  });

  it('should populate request base64File on success', async () => {
    app.post(
      '/test_file_image',
      multer.single('file'),
      fileImage(),
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_file_image')
      .attach('file', `${filePath}/file.png`)
      .expect(200);
  });
});
