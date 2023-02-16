const db = require('../config/database')
const {DataTypes} = require('sequelize')

const Experience = db.define('Experience', {
    title: {
        type: DataTypes.STRING,
    },
    employer: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    },
    tasks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
}, {
    tableName: 'Experiences',
    
})

module.exports = Experience