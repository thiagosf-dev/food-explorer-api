"use strict";

const AppError = require(`../utils/AppError`);

class UserFindAllService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute() {
    return await this.usersRepository.findAll();
  }
}

module.exports = UserFindAllService;
