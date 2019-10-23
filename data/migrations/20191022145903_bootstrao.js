
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username').unique().notNullable();
        tbl.string('password').notNullable();
      })
        .createTable('nannys', tbl => {
          tbl.increments();
          tbl.string('name').notNullable();
          tbl.string('email').notNullable().unique();
          tbl.string('zip_code').notNullable();
          tbl.integer('availability_start');
          tbl.integer('availability_end');
          tbl.boolean('responded')
            .default(0)
            .notNullable();
          tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        })
        .createTable('parents', tbl => {
          tbl.increments();
          tbl.string('name').notNullable();
          tbl.string('kids').notNullable();
          tbl.string('email').notNullable();
          tbl.string('zip_code').notNullable();
          tbl.boolean('selected')
            .default(0)
            .notNullable();
          tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        })
    };

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('parents')
    .dropTableIfExists('nannys')
    .dropTableIfExists('users')
};
