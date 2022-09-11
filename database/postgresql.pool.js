const { Pool } = require('pg');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;
