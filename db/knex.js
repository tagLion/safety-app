const environment = process.end.NODE_ENV || 'development'
const config = require('../knexfile.js')[environment]
const knex = require('knex')(config)

module.exports = knex
