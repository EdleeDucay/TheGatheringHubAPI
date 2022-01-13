
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const User = require('./user')

const Sticky = db.define('Sticky', {
    body: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'Stickies'
})

module.exports = Sticky