`use strict`;

const { verify } = require(`jsonwebtoken`);
const AppError = require(`../utils/AppError.js`);
const authConfig = require(`../configs/auth`);

module.exports = (request, response, next) => {
  const authHeader = request.headers;

  if (!authHeader.cookie) {
    throw new AppError(`O token deve ser informado.`, 401);
  }

  const [, token] = authHeader.cookie.split(`token=`);

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch (error) {
    console.error(error);
    throw new AppError(`Token inválido.`, 401);
  }
};
