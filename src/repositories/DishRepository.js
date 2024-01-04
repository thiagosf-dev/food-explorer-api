"use strict";

const knex = require(`../database/knex`);

class DishRepository {
  async create({
    name,
    category,
    description,
    price,
    image,
    user_id,
    ingredients,
  }) {
    const [dish_id] = await knex(`dishes`).insert({
      name,
      category,
      description,
      price,
      image,
      user_id,
    });

    const ingredientsList = ingredients.map((ingredient) => ({
      name: ingredient,
      dish_id,
      user_id,
    }));

    await knex(`ingredients`).insert(ingredientsList);

    return dish_id;
  }

  async findById(id) {
    return await knex(`dishes`).where({ id }).limit(1).first();
  }

  async findByNameWhereUserId(name, user_id) {
    return await knex(`dishes`).where({ name, user_id }).limit(1).first();
  }

  async findByIdWhereUserId(id, user_id) {
    return await knex(`dishes`).where({ id, user_id }).limit(1).first();
  }

  async updateImageById(dish, id) {
    return await knex(`dishes`).update(dish).where({ id });
  }
}

module.exports = DishRepository;
