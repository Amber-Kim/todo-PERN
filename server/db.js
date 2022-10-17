const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "Bibila8753!",
  port: "5432",
  database: "perntodo",
})

module.exports = pool;