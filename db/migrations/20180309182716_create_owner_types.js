exports.up = async function(knex, Promise) {
  return knex.schema.createTable("owner_types", function(table) {
    table.increments();
    table.string('type').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("owner_types");
};