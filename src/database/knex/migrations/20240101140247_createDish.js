exports.up = (knex) =>
  knex.schema.createTable(`dishes`, (table) => {
    table.increments(`id`);
    table.string(`name`, 150).notNullable();
    table.string(`category`, 30).notNullable();
    table.text(`description`).notNullable();
    table.text(`image`).notNullable();
    table.decimal(`price`, 8, 2).notNullable();
    table.integer("user_id").references("id").inTable("users");

    table.timestamp(`created_at`).default(knex.fn.now());
    table.timestamp(`updated_at`).default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable(`dishes`);
