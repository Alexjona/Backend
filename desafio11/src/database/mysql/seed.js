const { config } = require('./config');
const knex = require('knex')(config);
const { products } = require('./products');

const seedDatabaseProductsMySQL = async () => {
  try {
    console.log('\u001b[1;34m', '⚙ Configuring MYSQL');
    const existTableProducts = await knex.schema.hasTable('PRODUCTS');
    if (existTableProducts) {
      await knex.schema.dropTable('PRODUCTS');
    }
    await knex.schema.createTable('PRODUCTS', (table) => {
      table.string('id', 40).primary();
      table.string('name', 20).nullable(false);
      table.float('price').nullable(false);
      table.string('url', 300).nullable(false);
    });
    await knex('PRODUCTS').insert(products);
    await knex.destroy();
  } catch (error) {
    console.log(error.message);
  }
};

seedDatabaseProductsMySQL();