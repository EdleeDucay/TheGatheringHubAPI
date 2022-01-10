
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const User = require('./user')

const Sticky = db.define('Sticky', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'Stickies'
})

module.exports = Sticky