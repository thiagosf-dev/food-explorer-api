"use strict";

const { Router } = require(`express`);
const multer = require("multer");
const DishController = require(`../controllers/DishController`);
const ensureAuthenticated = require(`../middlewares/ensureAuthenticated.js`);
const DishImageController = require("../controllers/DishImageController.js");
const uploadConfig = require("../configs/upload.js");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization.js");

const dishRoutes = Router();
const dishController = new DishController();
const dishImageController = new DishImageController();
const upload = multer(uploadConfig.MULTER);

dishRoutes.use(ensureAuthenticated);

dishRoutes.post(`/`, verifyUserAuthorization(["admin"]), dishController.create);

dishRoutes.patch(
  "/:id/image",
  ensureAuthenticated,
  upload.single("image"),
  dishImageController.update
);

module.exports = dishRoutes;
