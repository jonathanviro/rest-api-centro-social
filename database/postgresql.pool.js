const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({
//     connectionString,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

module.exports = pool;
