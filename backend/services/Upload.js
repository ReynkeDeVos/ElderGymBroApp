import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Memory storage; the file is pushed to Cloudinary in the controller.
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

export const uploadAvatar = async (file) => {
  const { secure_url } = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    { folder: 'profileAvatar', allowed_formats: ['jpeg', 'jpg', 'png', 'heic', 'heif', 'webp', 'avif'] },
  );
  return secure_url;
};

export default upload;
