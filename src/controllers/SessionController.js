const AppError = require("../utils/AppError");

`use strict`;

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    if (!email) throw new AppError(`O e-mail deve ser informado.`);

    if (!password) throw new AppError(`A senha deve ser informada.`);
  }
}

module.exports = SessionController;
