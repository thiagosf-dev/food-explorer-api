`use strict`;

const AppError = require(`./../utils/AppError`);
const { hash } = require(`bcrypt`);

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, role, password }) {
    if (!name) throw new AppError(`O nome deve ser informado.`);

    if (!email) throw new AppError(`O e-mail deve ser informado.`);

    if (!password) throw new AppError(`A senha deve ser informada.`);

    if (!role) throw new AppError(`O nível de acesso deve ser informado.`);

    const queryCheckUserExists = await this.userRepository.findByEmail(email);

    if (queryCheckUserExists) throw new AppError(`Este e-mail já está em uso.`);

    const hashedPasword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      role,
      password: hashedPasword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
