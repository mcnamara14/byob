exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('restaurants', function(table) {
        table.increments('id').primary();
        table.string('name');

        table.integer('project_id').unsigned()
        table.foreign('project_id')
            .references('projects.id');

        table.timestamps(true, true);
        })
    ])
};
  
  
exports.down = function(knex, Promise) {
	return Promise.all([
        knex.schema.dropTable('restaurants')
]);
};
  