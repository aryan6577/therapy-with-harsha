const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    let folder = "therapy-with-harsha/payments";

    if (req.uploadFolder) {
      folder = req.uploadFolder;
    }

    return {
      folder,
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "heic",
        "heif",
      ],
      resource_type: "image",
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported image type"));
    }
  },
});

module.exports = upload;