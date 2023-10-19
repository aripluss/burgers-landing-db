const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Admin } = require("../models");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    admin: {
      email: newAdmin.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const loginError = HttpError(401, "Email or password is wrong");

  const admin = await Admin.findOne({ email });
  if (!admin) throw loginError;

  const passwordCompare = await bcrypt.compare(password, admin.password);
  if (!passwordCompare) throw loginError;

  const payload = { id: admin._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await Admin.findByIdAndUpdate(admin._id, { token });

  res.json({
    token,
    admin: {
      email: admin.email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.admin;

  await Admin.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email } = req.admin;

  res.json({
    email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
