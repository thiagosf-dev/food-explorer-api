`use strict`;

const knex = require("../database/knex");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await knex(`users`).where({ email }).first();

    if (!user) {
      throw new AppError(`E-mail e/ou senha incorreta.`, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(`E-mail e/ou senha incorreta.`, 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    response.cookie(`token`, token, {
      httpOnly: true,
      sameSite: `none`,
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    return user;
  }
}

module.exports = SessionCreateService;
