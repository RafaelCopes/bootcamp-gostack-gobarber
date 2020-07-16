import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, cb) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return cb(null, filename);
        },
    }),
};
