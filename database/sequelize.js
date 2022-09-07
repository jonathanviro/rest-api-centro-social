const { Sequelize } = require('sequelize');

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const DATABASE = process.env.DB_DATABASE;
const PORT = process.env.DB_PORT;
const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

module.exports = sequelize;
