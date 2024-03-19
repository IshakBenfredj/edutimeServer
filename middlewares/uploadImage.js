var cloudinary = require("cloudinary").v2;

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
exports.deleteImage = async (imageUrl) => {
  const publicId = imageUrl.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(publicId);
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
