
exports.up = function(knex) {
 return knex.schema.createTable('location', l  => {
   l.increments('id')
   l.integer('user_id').references('id').inTable('user').onDelete('CASCADE')
   l.string('LAT')
   l.string('LONG')
   l.timestamp('time').defaultTo(knex.fn.now())
   l.integer('incident_id').references('id').inTable('incident').onDelete('CASCADE')
 })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('location')
}
