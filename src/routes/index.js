`use strict`;

const { Router } = require(`express`);
const userRoutes = require(`./user.routes`);
const sessionRoutes = require(`./session.routes`);

const routes = Router();

routes.use(`/user`, userRoutes);

routes.use(`/session`, sessionRoutes);

module.exports = routes;
