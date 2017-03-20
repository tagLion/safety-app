
exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {
         firstname: 'Jessica',
         lastname: 'Smith',
         phone: '5104131234',
         email:'jessica.smith@gmail.com'
        },
        {
         firstname: 'Sarah',
         lastname: 'Arnold',
         phone: '3031234567',
         email:'sarah.arnold@gmail.com'
        },
        {
         firstname: 'Bob',
         lastname: 'Simat',
         phone: '7205551234',
         email:'bob.simat@gmail.com'
        }
      ])
    })
}
