const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const burgerSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Upload a burger image"],
    },
    title: {
      type: String,
      required: [true, "Set burger title"],
      minlength: [3, "Title must be at least 3 characters, got {VALUE}"],
      maxlength: [
        30,
        "Title must contain no more than 30 characters, got {VALUE}",
      ],
    },
    text: {
      type: String,
      required: [true, "Set burger description (field 'text')"],
      minlength: [
        10,
        "The field 'text' must be at least 10 characters, got {VALUE}",
      ],
      maxlength: [
        200,
        "The field 'text' must contain no more than 200 characters, got {VALUE}",
      ],
    },
    price: {
      type: Number,
      required: [true, "'price' is a required field"],
    },
    basePrice: {
      type: Number,
      required: [true, "'basePrice' is a required field"],
    },
    grams: {
      type: Number,
      required: [true, "'grams' is a required field"],
    },
  },
  { versionKey: false, timestamps: true }
);

burgerSchema.post("save", handleMongooseError);

const newBurgerSchema = Joi.object({
  image: Joi.string(),
  title: Joi.string().min(3).max(30).required().messages({
    "any.required": "Set burger title",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 30 characters",
  }),
  text: Joi.string().min(10).max(200).required().messages({
    "any.required": "Set burger description (field 'text')",
    "string.min": "The field 'text' must be at least 10 characters",
    "string.max": "The field 'text' must not exceed 200 characters",
  }),
  price: Joi.number().required().messages({
    "any.required": "'price' is a required field",
    "number.base": "'price' must be a number",
    "number.unsafe": "'price' must contain no more than 16 digits",
  }),
  basePrice: Joi.number().required().messages({
    "any.required": "'basePrice' is a required field",
    "number.base": "'basePrice' must be a number",
    "number.unsafe": "'basePrice' must contain no more than 16 digits",
  }),
  grams: Joi.number().required().messages({
    "any.required": "'grams' is a required field",
    "number.base": "'grams' must be a number",
    "number.unsafe": "'grams' must contain no more than 16 digits",
  }),
}).options({ abortEarly: false });

const updateBurgerSchema = Joi.object({
  image: Joi.string(),
  title: Joi.string().min(3).max(30).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 30 characters",
  }),
  text: Joi.string().min(10).max(200).messages({
    "string.min": "The field 'text' must be at least 10 characters",
    "string.max": "The field 'text' must not exceed 200 characters",
  }),
  price: Joi.number().messages({
    "number.base": "'price' must be a number",
    "number.unsafe": "'price' must contain no more than 16 digits",
  }),
  basePrice: Joi.number().messages({
    "number.base": "'basePrice' must be a number",
    "number.unsafe": "'basePrice' must contain no more than 16 digits",
  }),
  grams: Joi.number().messages({
    "number.base": "'grams' must be a number",
    "number.unsafe": "'grams' must contain no more than 16 digits",
  }),
}).options({ abortEarly: false });

const Burger = model("burger", burgerSchema);

const schemas = {
  newBurgerSchema,
  updateBurgerSchema,
};

module.exports = { Burger, schemas };
