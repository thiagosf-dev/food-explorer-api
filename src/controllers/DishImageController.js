"use strict";

const DishRepository = require("../repositories/DishRepository");
const DishUpdateImageService = require("../services/DishUpdateImageService");

class DishImageController {
  async update(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;
    const { filename } = request.file;

    const dishRepository = new DishRepository();

    const dishUpdateImageService = new DishUpdateImageService(dishRepository);

    const dish = await dishUpdateImageService.execute({
      filename,
      id,
      user_id,
    });

    return response.status(200).json(dish);
  }
}

module.exports = DishImageController;
