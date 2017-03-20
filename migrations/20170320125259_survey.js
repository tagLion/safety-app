
exports.up = function(knex) {
  return knex.schema.createTable('survey', s => {
    s.increments('id')
    s.integer('user_id').references('id').inTable('user').onDelete('CASCADE')
    s.string('body')
    s.integer('incident_id').references('id').inTable('incident').onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('survey')
}
