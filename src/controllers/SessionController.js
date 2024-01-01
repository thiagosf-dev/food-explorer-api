`use strict`;

const UserRepository = require("../repositories/UserRepository");
const SessionCreateService = require("../services/SessionCreateService");
const AppError = require("../utils/AppError");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    if (!email) throw new AppError(`O e-mail deve ser informado.`);

    if (!password) throw new AppError(`A senha deve ser informada.`);

    const userRepository = new UserRepository();

    const sessionCreateService = SessionCreateService(userRepository);
  }
}

module.exports = SessionController;
