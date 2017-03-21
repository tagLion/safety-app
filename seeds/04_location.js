
exports.seed = function(knex, Promise) {
  return knex('location').del()
    .then(function () {
      return knex('location').insert([
        {
          user_id:knex('user').where('id', 1).select('id'),
          LAT: '39.735320',
          LONG: '-104.991464',
          incident_id:knex('incident').where('id', 1).select('id')
        },
        {
          user_id:knex('user').where('id', 1).select('id'),
          LAT: '39.735336',
          LONG: '-104.988696',
          incident_id:knex('incident').where('id', 1).select('id')
        },
        {
          user_id:knex('user').where('id', 2).select('id'),
          LAT: '39.730297',
          LONG: '-104.983302',
          incident_id:knex('incident').where('id', 2).select('id')
        },
        {
          user_id:knex('user').where('id', 2).select('id'),
          LAT: '39.727190',
          LONG: '-104.982302',
          incident_id:knex('incident').where('id', 2).select('id')
        },
        {
          user_id:knex('user').where('id', 3).select('id'),
          LAT: '39.720505',
          LONG: '-104.985369',
          incident_id:knex('incident').where('id', 3).select('id')
        },
        {
          user_id:knex('user').where('id', 3).select('id'),
          LAT: '39.716692',
          LONG: '-104.986141',
          incident_id:knex('incident').where('id', 3).select('id')
        },
        {
          user_id:knex('user').where('id', 2).select('id'),
          LAT: '39.722222',
          LONG: '-104.978822',
          incident_id:knex('incident').where('id', 4).select('id')
        },

      ])
    })
};
