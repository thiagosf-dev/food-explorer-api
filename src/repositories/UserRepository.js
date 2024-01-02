`use strict`;

const knex = require(`../database/knex`);

class UserRepository {
  async create({ name, email, password, role }) {
    const [userId] = await knex(`users`).insert({
      name,
      email,
      password,
      role,
    });
    return userId;
  }

  async findByEmail(email) {
    return await knex(`users`).select(`*`).where({ email }).limit(1).first();
  }

  async findById(userId) {
    return knex(`users`).select(`*`).where({ id: userId }).limit(1).first();
  }
}

module.exports = UserRepository;
