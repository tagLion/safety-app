
exports.seed = function(knex, Promise) {
  return knex('eContact').del()
    .then(function () {
      return knex('eContact').insert([
        {
          user_id:knex('user').where('id', 1).select('id'),
          firstname: 'Mary',
          lastname: 'Smith',
          phone: '9995551234',
          email: 'test@hotmail.com'
        },
        {
          user_id:knex('user').where('id', 2).select('id'),
          firstname: 'Trish',
          lastname: 'Arnold',
          phone: '9994441234',
          email: 'test@gmail.com'
        },
        {
          user_id:knex('user').where('id', 2).select('id'),
          firstname: 'Thomas',
          lastname: 'Castleman',
          phone: '9013269492',
          email: 'thomas.castleman@gmail.com'
        },
        {
          user_id:knex('user').where('id', 3).select('id'),
          firstname: 'Rick',
          lastname: 'Simat',
          phone: '9993331234',
          email: 'rick@gmail.com'
        }
      ])
    })
}
