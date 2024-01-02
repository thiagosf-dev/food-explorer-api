`use strict`;

const DishRepository = require(`../repositories/DishRepository`);
const DishCreateService = require(`../services/DishCreateService`);
const DishFindByIdService = require(`../services/DishFindByIdService`);

class DishController {
  async create(request, response) {
    const { name, category, description, price, image, ingredients } =
      request.body;

    const user_id = request.user.id;

    const dishRepository = new DishRepository();

    const dishCreateService = new DishCreateService(dishRepository);
    const dishId = await dishCreateService.execute({
      category,
      description,
      image,
      ingredients,
      name,
      price,
      user_id,
    });

    const dishFindByIdService = new DishFindByIdService(dishRepository);
    const dish = await dishFindByIdService.execute(dishId);

    return response.status(201).json(dish);
  }
}

module.exports = DishController;
