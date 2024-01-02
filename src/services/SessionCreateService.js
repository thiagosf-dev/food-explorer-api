`use strict`;

const knex = require(`../database/knex`);
const { compare } = require(`bcrypt`);
const { sign } = require(`jsonwebtoken`);
const authConfig = require(`../configs/auth`);
const AppError = require(`../utils/AppError`);

class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`E-mail e/ou senha incorreta.`, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(`E-mail e/ou senha incorreta.`, 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

module.exports = SessionCreateService;
