const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const adminSchema = new Schema(
  {
    adminName: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must not exceed 30 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.post("save", handleMongooseError);

const Admin = model("admin", adminSchema);

const adminRegisterJoiSchema = Joi.object({
  adminName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(8).max(30).required(),
});

const adminLoginJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(8).max(30).required(),
});

const schemas = {
  adminRegisterJoiSchema,
  adminLoginJoiSchema,
};

module.exports = { Admin, schemas };
