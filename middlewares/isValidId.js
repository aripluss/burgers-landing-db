const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { burgerId } = req.params;
  if (!isValidObjectId(burgerId)) {
    next(HttpError(400, `${burgerId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
