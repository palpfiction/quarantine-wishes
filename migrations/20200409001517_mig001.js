exports.up = async function (knex) {
  await knex.schema.createTable("wish", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.timestamp("created");
    table.string("text", 500).notNullable();
    table.string("publisher", 30);
    table.string("ip", 30).notNullable();
  });
};

exports.down = async function (knex) {
  knex.schema.dropTable("wish");
};
