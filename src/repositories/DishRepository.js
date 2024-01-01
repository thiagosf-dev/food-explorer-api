`use strict`;

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
    return knex(`dishes`).where({ id }).limit(1).first();
  }

  async findByName(name) {
    return knex(`dishes`).where({ name }).limit(1).first();
  }
}

module.exports = DishRepository;
