
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('survey').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey').insert([
        {
          user_id:knex('user').where('id', 1).select('id'),
          body:'I was scared being in an unfamiliar neighborhood past midnight, I am OK now',
          incident_id:knex('incident').where('id', 1).select('id')
       },
       {
         user_id:knex('user').where('id', 2).select('id'),
         body:'I was alone after a party and didnt know where to go',
         incident_id:knex('incident').where('id', 2).select('id')
       },
        {
          user_id:knex('user').where('id', 3).select('id'),
          body:'I needed someone to help me',
          incident_id:knex('incident').where('id', 3).select('id')
       }
      ])
    })
}
