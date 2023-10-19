const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    // Перевірка наявності поля "image" та req.file (запит put)
    if ("image" in req.body && !req.file) {
      res.status(400).json({ error: 'Field "image" can\'t be empty' });
      return;
    }

    const { error } = schema.validate(req.body);
    if (error) next(HttpError(400, error.message));
    next();
  };

  return func;
};

module.exports = validateBody;
