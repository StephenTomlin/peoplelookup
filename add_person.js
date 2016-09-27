const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port : settings.port,
    ssl : settings.ssl
  }
});

var first = process.argv[2]
var last = process.argv[3]
var dob = process.argv[4]

knex('famous_people').insert({'first_name' : `${first}`,'last_name' : `${last}`,'birthdate' : `${dob}`})
.then(function () {
  return knex.destroy();
})