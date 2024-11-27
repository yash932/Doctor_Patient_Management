const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('db', 'user, 'password, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

module.exports = { sequelize };