`use strict`;

const { Router } = require(`express`);
const DishController = require(`../controllers/DishController`);
const ensureAuthenticated = require(`../middlewares/ensureAuthenticated.js`);

const dishRoutes = Router();
const dishController = new DishController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post(`/`, dishController.create);

module.exports = dishRoutes;
