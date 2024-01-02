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

    const { user, token } = await sessionCreateService.execute({
      email,
      password,
    });

    if (!user || !token)
      throw new AppError(`Ocorreu um erro ao tentar criar uma sessão.`);

    response.cookie(`token`, token, {
      httpOnly: true,
      sameSite: `none`,
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    return response.status(200).json(user);
  }
}

module.exports = SessionController;
