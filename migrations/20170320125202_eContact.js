
exports.up = function(knex) {
  return knex.schema.createTable('eContact', contact => {
    contact.increments('id')
    contact.integer('user_id').references('id').inTable('user').onDelete('CASCADE')
    contact.string('firstname')
    contact.string('lastname')
    contact.string('email')
    contact.string('phone')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('eContact')
}
