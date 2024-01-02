"use strict";

const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishImageController {
  async update(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;
    const { filename } = request.file;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user)
      throw new AppError(
        "Somente usuário autenticado pode mudar a imagem do prato",
        401
      );

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) throw new AppError(`Prato não cadastrado.`, 404);

    const diskStorage = new DiskStorage();

    if (dish.image) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(filename);

    dish.image = fileName;

    await knex("dishes").update(dish).where({ id });

    return response.status(200).json(user);
  }
}

module.exports = DishImageController;
