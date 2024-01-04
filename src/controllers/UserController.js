"use strict";

const AppError = require(`../utils/AppError.js`);
const UserRepository = require(`../repositories/UserRepository.js`);
const UserCreateService = require(`../services/UserCreateService.js`);
const UserFindByIdService = require(`../services/UserFindByIdService.js`);
const UserFindAllService = require("../services/UserFindAllService.js");

class UserController {
  async create(request, response) {
    const { name, email, password, role } = request.body;

    const userRepository = new UserRepository();

    const userCreateService = new UserCreateService(userRepository);
    const userId = await userCreateService.execute({
      name,
      email,
      password,
      role,
    });

    const userFindByIdService = new UserFindByIdService(userRepository);
    const newUser = await userFindByIdService.execute(userId);

    delete newUser.password;

    return response.status(201).json(newUser);
  }

  async show(request, response) {
    const userRepository = new UserRepository();
    const userFindAllService = new UserFindAllService(userRepository);
    const users = userFindAllService.execute();
    return response.status(200).json(users ?? []);
  }
}

module.exports = UserController;
