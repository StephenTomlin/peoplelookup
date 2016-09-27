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

knex.select('*').from('famous_people').where('last_name',`${process.argv[2]}`).orWhere('first_name', `${process.argv[2]}`)
.asCallback(function(err,result) {
  if (err) return console.error(err);
  CheckEm(result);
})
.then(function () {
  return knex.destroy();
})
// var firstName = process.argv[2]
// var lastName = process.argv[3]
// var dob = process.argv[4]

// knex('famous_people').insert({'first_name' : `${firstName}`,'last_name' : `${lastName}`,'birthdate' : `${dob}`})
// .then(function () {
//   return knex.destroy();
// })

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT * FROM famous_people WHERE last_name LIKE $1::text OR first_name LIKE $1::text", [`${process.argv[2]}`], (err, result) => {
//     console.log("Searching ...")
//     if (err) {
//       return console.error("error running query", err);
//     }
//     CheckEm(result);
//     client.end();
//   });
// });

function CheckEm(result) {
  for (var i = 0; i < result.length; i++) {
    console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`);
    console.log(`- ${result[i].id}: ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate}'`) //output: 1
  }
}
