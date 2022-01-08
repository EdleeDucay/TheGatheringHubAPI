
const db = require('../config/database')
const {DataTypes} = require('sequelize')

const Sticky = db.define('Sticky', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    body: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Stickies'
})

module.exports = Sticky