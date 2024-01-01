`use strict`;

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
  }
}

module.exports = SessionCreateService;
