const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;
const port = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
