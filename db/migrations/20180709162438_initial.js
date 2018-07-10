exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('restaurants', function(table) {
			table.increments('id').primary();
			table.string('name');
			table.string('address');
			table.string('zip');
			table.string('city');
			table.string('state');
			table.integer('phone');
			table.string('website');
			table.string('hours');

			table.timestamps(true, true);
		}),

		knex.schema.createTable('drinks', function(table) {
			table.increments('id').primary();
			table.string('description');
			table.string('best_deal');
			table.integer('restaurant_id').unsigned()
			table.foreign('restaurant_id')
					.references('restaurants.id');

			table.timestamps(true, true);
		}),

		knex.schema.createTable('foods', function(table) {
			table.increments('id').primary();
			table.string('description');
			table.string('best_deal');
			table.integer('restaurant_id').unsigned()
			table.foreign('restaurant_id')
					.references('restaurants.id');

			table.timestamps(true, true);
		})
	])
};
   
exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('restaurants'),
		knex.schema.dropTable('drinks'),
		knex.schema.dropTable('foods')
	]);
};
  