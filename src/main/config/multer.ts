import path from 'path';

const destPath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'images');
const filesExt = /\.(jpe?g|png)$/gm;
const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
const fileSize = 1000000;

export default {
  destPath,
  filesExt,
  fileSize,
  allowedMimes,
};
