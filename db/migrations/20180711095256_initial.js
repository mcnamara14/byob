exports.up = function (knex, Promise) {
    return Promise.all([
      knex.schema.createTable('restaurants', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('address');
        table.integer('zip');
        table.string('city');
        table.string('state');
        table.string('phone');
        table.string('website');
        table.string('monday');
        table.string('tuesday');
        table.string('wednesday');
        table.string('thursday');
        table.string('friday');
        table.string('saturday');
        table.string('sunday');
  
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable('drinks', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('best_deal');
        table.integer('restaurant_id').unsigned();
        table.foreign('restaurant_id')
          .references('restaurants.id');
  
        table.timestamps(true, true);
      })
    ]);
  };
  
  exports.down = function (knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('restaurants'),
      knex.schema.dropTable('drinks')
    ]);
  };
  