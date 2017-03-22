
exports.seed = function(knex, Promise) {
  return knex('incident').del()
    .then(function () {
      return knex('incident').insert([
        {
          user_id:knex('user').where('id',1).select('id'),
          start_LAT: '39.749821',
          start_LONG: '-104.988530',
          end_LAT:'39.753195',
          end_LONG: '-104.983369',
          is_incident: true
        },
        {
          user_id:knex('user').where('id',2).select('id'),
          start_LAT: '39.735132',
          start_LONG: '-104.984152',
          end_LAT:'39.727156',
          end_LONG: '-104.975580',
          is_incident: true
        },
        {
          user_id:knex('user').where('id',3).select('id'),
          start_LAT: '39.722250',
          start_LONG: '-104.978877',
          end_LAT:'39.713169',
          end_LONG: '-104.985231',
          is_incident: true
        },
        {
          user_id:knex('user').where('id',2).select('id'),
          start_LAT: '39.722222',
          start_LONG: '-104.978822',
          is_incident: false
        }
      ])
    })
};
