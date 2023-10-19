const express = require("express");

const ctrl = require("../../controllers/burgers");
const {
  validateBody,
  validateImage,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");
const {
  schemas: { newBurgerSchema, updateBurgerSchema },
} = require("../../models/burger");

const router = express.Router();

router.get("/", ctrl.getBurgers);

router.get("/:burgerId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  upload.single("image"),
  validateImage,
  validateBody(newBurgerSchema),
  ctrl.addBurger
);

router.put(
  "/:burgerId",
  authenticate,
  isValidId,
  upload.single("image"),
  validateBody(updateBurgerSchema),
  ctrl.updateBurger
);

router.delete("/:burgerId", authenticate, isValidId, ctrl.deleteBurger);

module.exports = router;
