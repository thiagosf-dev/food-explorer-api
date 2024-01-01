`use strict`;

const { Router } = require(`express`);
const sessionRoutes = require(`./session.routes`);
const userRoutes = require(`./user.routes`);
const dishRoutes = require(`./dish.routes`);

const routes = Router();

routes.use(`/user`, userRoutes);

routes.use(`/session`, sessionRoutes);

routes.use(`/dish`, dishRoutes);

module.exports = routes;
