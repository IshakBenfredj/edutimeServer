var cloudinary = require("cloudinary").v2;
// const cloud_name = process.env.CLOUD_NAME;
// const api_key = process.env.API_KEY;
// const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: "dfwxtyqz9",
  api_key: "915533779278641",
  api_secret: "kEbXnaZOlb7_KI8ItkBwhFTQoCk",
});

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      image,
      { resource_type: "image", chunked: true },
      (error, result) => {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        console.error(error);
        return reject({ message: error.message });
      }
    );
  });
};
module.exports = uploadImage;

// module.exports.uploadMultipleImages = (images) => {
//   return new Promise((resolve, reject) => {
//     const uploads = images.map((base) => uploadImage(base));
//     Promise.all(uploads)
//       .then((values) => resolve(values))
//       .catch((err) => reject(err));
//   });
// };
