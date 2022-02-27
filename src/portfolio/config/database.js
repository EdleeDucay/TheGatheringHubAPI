const Sequelize = require('sequelize');
require('dotenv').config({path: '.env'})

const db = new Sequelize(
    "portfolio",
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, 
    {
        host: process.env.HOST_NAME,
        dialect: "postgres",

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = db;
