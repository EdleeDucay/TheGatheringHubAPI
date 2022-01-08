
const db = require('../config/database')
const {DataTypes} = require('sequelize')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    dateCreated: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Users'
})

module.exports = User