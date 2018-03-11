exports.up = async function(knex, Promise) {
  return knex.schema.createTable("rating_systems", function(table) {
    table.increments();
    table.string('rating_system').notNullable();
    table.string('version').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("rating_systems");
};

