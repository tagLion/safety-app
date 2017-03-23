
exports.up = function(knex) {
    return knex.schema.createTable('incident', i => {
      i.increments('id')
      i.integer('user_id').references('id').inTable('user').onDelete('CASCADE')
      i.string('start_LAT')
      i.string('start_LONG')
      i.string('end_LAT')
      i.string('end_LONG')
      i.timestamp('start_timestamp').defaultTo(knex.fn.now())
      i.timestamp('end_timestamp').defaultTo(null)
      i.bool('is_incident')
      i.string('key')
    })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('incident')
}
