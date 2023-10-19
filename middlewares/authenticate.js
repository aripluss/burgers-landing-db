const jwt = require("jsonwebtoken");

const { Admin } = require("../models");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const authenticateError = HttpError(401, "Not authorized");

  if (bearer !== "Bearer") next(authenticateError);

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const admin = await Admin.findById(id);

    if (!admin || !admin.token || admin.token !== token)
      next(authenticateError);

    req.admin = admin;

    next();
  } catch (err) {
    next(authenticateError);
  }
};

module.exports = authenticate;
