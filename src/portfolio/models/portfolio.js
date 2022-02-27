const db = require('../config/database')
const {DataTypes} = require('sequelize')

const Portfolio = db.define('Portfolio', {
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    linkedin: {
        type: DataTypes.STRING,
    },
    github: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.TEXT,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    
}, {
    tableName: 'Portfolios',
    
})

module.exports = Portfolio