import { type NextFunction, type Request, type Response } from 'express';
import sharp from 'sharp';

export const fileImage = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.file) {
      if (req.method === 'PUT') {
        next();
        return;
      }

      res.statusCode = 400;
      res.json({ error: 'File not found' });
      return;
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.base64File = buffer.toString('base64');

    next();
  };
};
