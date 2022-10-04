const { Pool } = require('pg');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

console.log(connectionString);
const pool = new Pool({
    connectionString,
});

module.exports = pool;
