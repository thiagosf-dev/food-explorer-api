`use strict`;

const UserRepository = require(`../repositories/UserRepository`);
const SessionCreateService = require(`../services/SessionCreateService`);
const AppError = require(`../utils/AppError`);

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    if (!email) throw new AppError(`O e-mail deve ser informado.`);

    if (!password) throw new AppError(`A senha deve ser informada.`);

    const userRepository = new UserRepository();

    const sessionCreateService = new SessionCreateService(userRepository);
    const user = sessionCreateService.execute({ email, password });

    console.log(`user :>> `, user);
    return response.status(200).json(user);
  }
}

module.exports = SessionController;
