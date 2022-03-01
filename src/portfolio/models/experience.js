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

}, {
    tableName: 'Experiences',
    
})

module.exports = Experience