`use strict`;

const AppError = require(`../utils/AppError`);

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute({
    name,
    category,
    description,
    price,
    image,
    user_id,
    ingredients,
  }) {
    if (!name) throw new AppError(`O nome do prato deve ser informado.`);

    if (!category)
      throw new AppError(`A categoria do prato deve ser informada.`);

    if (!description)
      throw new AppError(`A descrição do prato deve ser informada.`);

    if (!price || price < 0)
      throw new AppError(`O preço do prato não pode ser negativo.`);

    if (!ingredients || ingredients.length <= 0)
      throw new AppError(`O prato deve ter ao menos 1 ingrediente.`);

    if (!image) throw new AppError(`A imagem do prato deve ser informada.`);

    const dish = await this.dishRepository.findByNameWhereUserId(name, user_id);

    if (dish) throw new AppError(`Já existe um prato com o nome informado.`);

    const createdDishId = await this.dishRepository.create({
      name,
      category,
      description,
      price,
      image,
      user_id,
      ingredients,
    });

    if (!createdDishId)
      throw new AppError(`Ocorreu um erro ao tentar criar o prato.`);

    return createdDishId;
  }
}

module.exports = DishCreateService;
