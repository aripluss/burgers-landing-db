const { HttpError } = require("../helpers");

const validateImage = (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, "Upload a burger image"));
  }
  next();
};

module.exports = validateImage;
