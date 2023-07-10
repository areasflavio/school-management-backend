import multer, { Multer } from 'multer';

import { UploadFile } from '@core/helpers/upload-file';
import multerConfig from '@main/config/multer';

export class MulterUploadFileAdapter implements UploadFile {
  private upload: Multer;

  constructor() {
    const ext = multerConfig.filesExt;
    this.upload = multer({
      dest: multerConfig.destPath,
      limits: {
        fileSize: multerConfig.fileSize,
      },
      fileFilter(req, file, cb) {
        if (!ext.exec(file.originalname)) {
          return cb(new Error('Please upload a image.'));
        }
        cb(null, true);
      },
      storage: multer.memoryStorage(),
    });
  }

  single(fieldName: string): any {
    return this.upload.single(fieldName);
  }
}
