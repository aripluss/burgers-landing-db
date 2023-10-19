const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const CLIENT_MAX_BODY_SIZE = "100mb";

// Multer configuration for saving images
const multerConfig = multer.diskStorage({
  destination: tempDir,
  //   destination: function (req, file, cb) {
  //   cb(null, "burger-images"); // Папка для сохранения изображений
  // },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = path.basename(file.originalname, extension); // без розширення назва
    cb(null, filename + uniqueSuffix + extension);
  },
  limits: {
    fileSize: CLIENT_MAX_BODY_SIZE,
  },
});

// Filter to only accept files with image extensions
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Create a Multer instance
const upload = multer({ storage: multerConfig, fileFilter });

module.exports = upload;
