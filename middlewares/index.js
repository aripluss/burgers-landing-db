const validateBody = require("./validateBody");
const validateImage = require("./validateImage");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const clearTmpFolder = require("../cron-jobs/clearTmpFolder");
const upload = require("./upload");

module.exports = {
  validateBody,
  validateImage,
  isValidId,
  authenticate,
  clearTmpFolder,
  upload,
};
