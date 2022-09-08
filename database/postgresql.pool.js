const { Pool } = require('pg');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     // ssl: { rejectUnauthorized: false },
// });

// const connectionString = `postgresql://dbuser:secretpassword@database.server.com:3211/mydb`;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
    extra: {
        ssl: true,
    },
});

module.exports = pool;
