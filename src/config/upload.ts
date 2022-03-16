import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

export default {
  upload(folder_name: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder_name),
        filename: (request, file, callback) => {
          // create random string to avoid files with same name
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        }
      })
    };
  }
};
