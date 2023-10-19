const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/admin");

const router = express.Router();

router.post(
  "/admin/register",
  validateBody(schemas.adminRegisterJoiSchema),
  ctrl.register
);

router.post(
  "/admin/login",
  validateBody(schemas.adminLoginJoiSchema),
  ctrl.login
);

router.post("/admin/logout", authenticate, ctrl.logout);

router.get("/admin/current", authenticate, ctrl.getCurrent);

module.exports = router;