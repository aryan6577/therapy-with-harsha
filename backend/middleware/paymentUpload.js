const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "therapy-payments",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },
});

module.exports = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 1 MB
  },

  fileFilter(req, file, cb) {
    if (
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files are allowed."
        )
      );
    }
  },
});