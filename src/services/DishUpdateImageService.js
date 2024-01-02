`use strict`;

const knex = require(`../database/knex`);
const DiskStorage = require(`../providers/DiskStorage`);
const AppError = require(`../utils/AppError`);

class DishUpdateImageService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute({ id, filename, user_id }) {
    if (!id) throw new AppError(`O id do prato deve ser informado.`);

    if (!filename)
      throw new AppError(`O nome do arquivo de imagem deve ser informado.`);

    if (!user_id) throw new AppError(`O id do usuário deve ser informado.`);

    const dish = await this.dishRepository.findByIdWhereUserId(id, user_id);

    if (!dish) throw new AppError(`Prato não cadastrado.`, 404);

    const diskStorage = new DiskStorage();

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const fileName = await diskStorage.saveFile(filename);

    dish.image = fileName;

    await this.dishRepository.updateImageById(dish, id);

    return dish;
  }
}

module.exports = DishUpdateImageService;
