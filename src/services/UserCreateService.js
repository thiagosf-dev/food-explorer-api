"use strict";

const AppError = require("./../utils/AppError");
const { hash } = require("bcrypt");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const queryCheckUserExists = await this.userRepository.findByEmail(email);

    if (queryCheckUserExists)
      throw new AppError("Este e-mail já está em uso.");

    const hashedPasword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPasword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
