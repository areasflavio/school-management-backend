import path from 'path';

const destPath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'images');
const filesExt = /\.(jpe?g|png)$/gm;
const fileSize = 1000000;

export default {
  destPath,
  filesExt,
  fileSize,
};
