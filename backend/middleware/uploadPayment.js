const multer = require("multer");
const path = require("path");

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/payments");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },

  fileFilter(req, file, cb) {

    // Check MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        )
      );
    }

    // Check extension
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    if (!allowedExtensions.includes(extension)) {
      return cb(
        new Error(
          "Invalid image extension."
        )
      );
    }

    cb(null, true);
  },
});

module.exports = upload;