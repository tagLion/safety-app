
exports.up = function(knex) {
  return knex.schema.createTable('user', user => {
    user.increments('id')
    user.string('firstname')
    user.string('lastname')
    user.string('email')
    user.string('phone')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user')
}
