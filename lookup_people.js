const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name LIKE $1::text OR first_name LIKE $1::text", [`${process.argv[2]}`], (err, result) => {
    console.log("Searching ...")
    if (err) {
      return console.error("error running query", err);
    }
    CheckEm(result);
    client.end();
  });
});

function CheckEm(result) {
  for (var i = 0; i < result.rowCount; i++) {
    console.log(`Found ${result.rowCount} person(s) by the name '${process.argv[2]}':`);
    console.log(`- ${result.rows[i].id}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`) //output: 1
  }
}
