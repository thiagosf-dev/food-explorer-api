`use strict`;

const AppError = require(`../utils/AppError`);

class DishFindByIdService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id) {
    if (!id) throw new AppError(`O ID do prato deve ser informado.`);

    return this.dishRepository.findById(id);
  }
}

module.exports = DishFindByIdService;
