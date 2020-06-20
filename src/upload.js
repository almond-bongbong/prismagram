import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

aws.config.update({ region: 'ap-northeast-2' });
const credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new aws.S3({
  credentials,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'prismagram-max',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
export const uploadMiddleware = upload.single('file');

export const uploadController = (req, res) => {
  const { file } = req;
  console.log(file);
  const { location } = file;
  res.json({ location });
};
