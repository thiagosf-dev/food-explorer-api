"use strict";

const AppError = require(`../utils/AppError`);

class UserFindByIdService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(userId) {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError(`Usuário não encontrado.`, 404);

    return user;
  }
}

module.exports = UserFindByIdService;
